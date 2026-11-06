// The Switch page demo (switching accounts round 2, the switch UX sketch): runs a switch of the demo's "work" profile
// with sample timings, and shows the six cases a switch can meet when something goes wrong. Nothing on this Mac
// changes. settings.astro owns the page state (it hides the profile's settings while this page is open).
import { accounts, standby, byRoom, shortName, type Standby } from "./demo";
import { standbyLimitsHTML } from "./panelView";
import { loadCardStyle } from "./prefs";
import { showWhatNow } from "./whatNow";

type Phase = "ready" | "closing" | "moving" | "code" | "window" | "sidebar" | "done" | "fail";
type Fail = "window" | "half" | "wrong" | "sidebar" | "cancel" | "undo";

export function initSwitch(page: HTMLElement, hooks: { close: () => void; tile: () => HTMLElement | null }) {
  const q = <T extends HTMLElement = HTMLElement>(s: string) => page.querySelector<T>(s)!;
  const work = accounts.find((x) => x.id === "work")!;
  const name = work.name, from = shortName(work.email);
  const inUse: Standby = { email: work.email, plan: work.plan, org: "Work", five: work.five, week: work.week, fiveLeftMin: work.fiveLeftMin, weekLeftMin: work.weekLeftMin };
  const list = byRoom(standby.work);
  let to = list[0].email, answer: "" | "move" | "leave" = "", phase: Phase = "ready", fail: Fail = "window", timer = 0;
  const T = () => shortName(to), target = () => list.find((s) => s.email === to)!;
  const w = window as any;

  // ── the parts ──
  const box = (s: Standby, lit: boolean, badge: string, cls = "", note = "", attr = "") =>
    `<div class="abox${lit ? "" : " unlit"}${cls}"${attr}><div class="abox-head"><i class="abox-lamp${lit ? " on" : ""}"></i><span class="abox-t"><b class="email">${s.email}</b><small>${s.plan} · ${s.org}</small></span>${badge}</div>${standbyLimitsHTML(s, loadCardStyle())}${note}</div>`;
  const B = { use: '<span class="disp xs abox-badge"><span class="g">In use</span></span>', sb: '<span class="disp xs abox-badge"><em>Standby</em></span>',
    to: '<span class="disp xs abox-badge litp"><em>Switching</em> to</span>', not: '<span class="disp xs abox-badge"><em>Not switched</em></span>' };
  const flow = (l1: string, a: string, l2: string, b: string) => `<span class="lbl">${l1}</span>${a}<span class="lbl">${l2}</span>${b}`;
  const chk = (cls: string, t: string) => `<div class="chk"><span class="disp"><span class="${cls}">${t}</span></span></div>`;
  const em = (t: string) => `<div class="chk"><span class="disp"><em>${t}</em></span></div>`;
  const keyRow = (...ks: [string, string][]) => `<div class="chk">${ks.map(([a, t]) => `<button type="button" class="key k" ${a}>${t}</button>`).join("")}</div>`;
  const sp = (t: string) => `<span>${t}</span>`;
  const K = (a: string, t: string) => `<button type="button" class="key k" ${a}>${t}</button>`;
  const GO = (a: string, t: string, dim = false) => `<button type="button" class="pill small tint t-green${dim ? " dimmed" : ""}" ${a}>${t}</button>`;
  const STOP = (a: string, t: string) => `<button type="button" class="pill small tint t-red" ${a}>${t}</button>`;
  const run = (disp: string, ...ks: string[]) => `<span class="disp">${disp}</span><span class="spacer"></span>${ks.join("")}`;
  const titles = () => [`${name}'s Claude window closes`, `The sessions move to ${T()}`, `Claude Code signs in as ${T()}`, `The Claude window signs in as ${T()}`, "The sidebar, as before"];

  // the six cases, as the sketch has them (the app meets each of them today)
  const FAIL = (): Record<Fail, { head: string; d: [string, string, string, string]; run: string; acc: string; ses: string; steps: [string, string][]; titles?: string[] }> => {
    const now = box(inUse, true, B.use), next = (b: string) => box(target(), false, b);
    const before = flow("Now", now, "Next", next(B.not));
    return {
      window: { head: `Switch Claude ${name} to ${T()}`, d: ["", "Switch stopped", "a", "nothing moved"],
        run: run('<span class="r">Stopped at step 1</span> <em>· nothing moved</em>', K("data-sw-back", `Back to ${name}'s settings`), GO("data-sw-again", "Try again")),
        acc: before, ses: "Nothing moved: all 14 stay with " + from + ".",
        steps: [["fail", chk("r", "Window · still open after 45 s") + sp("It may be asking about unsaved work. Answer it there, then Try again.") + keyRow(["data-sw-showwin", "Show the Claude window"])], ["", ""], ["", ""], ["", ""], ["", ""]] },
      half: { head: `Switch Claude ${name} to ${T()}`, d: ["", "Switch stopped", "r", "undo needed"],
        run: run(`<span class="r">Stopped half way</span> <em>· 9 of 14 sessions moved · ${name} still on ${from}</em>`, K("data-sw-receipt", "Show the receipt"), GO("data-sw-undo", "Undo: put the 9 back")),
        acc: before, ses: `9 of 14 moved to ${T()}, then it stopped; the other 5 are still with ${from}. ${name}'s window stays closed until Undo, so it never shows half a sidebar.`,
        steps: [["done", ""], ["fail", chk("r", "Moved 9 of 14 · stopped") + sp("Couldn't write in the Claude window's folder. Nothing is deleted: the 9 are parked, listed in the receipt.")], ["", ""], ["", ""], ["", ""]] },
      wrong: { head: `Switching Claude ${name} to ${T()}`, d: ["b", "Switching ●", "b", `to ${T()}`],
        run: run('<span class="a">Waiting for you</span> <em>· step 3 of 5 · wrong account</em>', STOP("data-sw-cancel", "Cancel switch, put everything back")),
        acc: flow("Now", now, "Next", next(B.to)), ses: `14 moved to ${T()}, parked until Claude Code is on ${T()}. Cancel puts them back.`,
        steps: [["done", ""], ["done", sp("14 sessions and 2 scheduled tasks moved.")], ["warn", chk("r", `Signed in as ${from} · not ${T()}`) + sp(`The browser was on ${from}. Switch the browser to ${to} (or sign out there), then Sign in again.`) + keyRow(["data-sw-signin", "Sign in again…"])], ["", ""], ["", ""]] },
      sidebar: { head: `Claude ${name} switched to ${T()}`, d: ["", "Switched to", "g", T()],
        run: run(`<span class="g">Claude ${name} is on ${T()}</span> <em>· the sidebar still to arrange</em>`, K("data-sw-back", `Back to ${name}'s settings`)),
        acc: flow("Now", box(target(), true, B.use), "Before", box(inUse, false, B.sb)), ses: `14 sessions and 2 scheduled tasks are on ${T()}; their sections, groups and pins are still to arrange.`,
        steps: [["done", ""], ["done", ""], ["done", chk("g", `Claude Code · ${T()} ✓`)], ["done", chk("g", `Window · ${T()} ✓`)], ["warn", chk("a", `The link didn't reach ${name}'s window`) + sp("cl_audit may not control Claude while other Claude windows are open. Allow it in System Settings ▸ Privacy & Security ▸ Automation, or quit the other Claude windows, then open the session again.") + keyRow(["data-sw-settings", "Open System Settings"], ["data-sw-open", "Open the session again"])]] },
      cancel: { head: `Switch cancelled: Claude ${name} stays on ${from}`, d: ["", "Switch cancelled", "g", from],
        run: run(`<span class="g">Put back</span> <em>· Claude ${name} is on ${from}, as before</em>`, K("data-sw-back", `Back to ${name}'s settings`), K("data-sw-again", "Switch again…")),
        acc: flow("Now", now, "Other", box(target(), false, B.sb)), ses: `All 14 sessions and 2 scheduled tasks are back with ${from}.`,
        titles: [`${name}'s Claude window`, "The sessions", "Claude Code", "The Claude window", "The sidebar"],
        steps: [["done", chk("g", "Open again ✓")], ["done", chk("g", `14 back with ${from} ✓`)], ["done", chk("g", `Still ${from} ✓`)], ["", sp("Not reached.")], ["", sp("Not reached.")]] },
      undo: { head: `Switch Claude ${name} to ${T()}`, d: ["", "Undo stopped", "r", "see the receipt"],
        run: run('<span class="r">Undo stopped</span> <em>· 4 of 9 sessions back · nothing deleted</em>', K("data-sw-receipt", "Show the receipt"), GO("data-sw-undo", "Try Undo again")),
        acc: before, ses: `4 of the 9 are back with ${from}; 5 are still parked, listed in the receipt. ${name}'s window stays closed until they're all back.`,
        steps: [["done", ""], ["fail", chk("r", "Undo · 4 of 9 back · stopped") + sp("Couldn't write in the Claude window's folder. The receipt in cl_audit's folder lists the 5 still parked.") + keyRow(["data-sw-receipt", "Show the receipt"])], ["", ""], ["", ""], ["", ""]] },
    };
  };

  // ── drawing ──
  const at = () => ({ ready: 0, closing: 1, moving: 2, code: 3, window: 4, sidebar: 5, done: 6, fail: 0 } as const)[phase];
  const display = (l1c: string, l1: string, l2c: string, l2: string) => {
    const tile = hooks.tile();
    if (!tile) return;
    let d = tile.nextElementSibling as HTMLElement | null;
    if (!d?.matches(".sw-disp")) { d = document.createElement("span"); d.className = "disp sw-disp two"; tile.after(d); }
    tile.classList.add("sw-host");
    d.innerHTML = `<span class="l1 ${l1c}">${l1}</span><span class="l2 ${l2c}">${l2}</span>`;
  };
  const draw = () => {
    const move = answer === "move";
    page.querySelectorAll<HTMLElement>(".tn").forEach((e) => (e.textContent = T()));
    page.querySelectorAll<HTMLButtonElement>("[data-sw-q]").forEach((b) => {
      b.classList.toggle("on", b.dataset.swQ === answer);
      b.classList.toggle("dis", phase !== "ready" && b.dataset.swQ !== answer);
      b.disabled = phase !== "ready";
    });
    const head = q("[data-sw-head]"), runEl = q("[data-sw-run]"), steps = q("[data-sw-steps]"), keys = q("[data-sw-keys]");
    q("[data-sw-demo]").hidden = phase !== "ready" && phase !== "fail";
    page.querySelectorAll<HTMLElement>("[data-sw-fail]").forEach((b) => b.classList.toggle("on", phase === "fail" && b.dataset.swFail === fail));
    steps.classList.toggle("reached", phase === "fail");
    if (phase === "fail") {
      const c = FAIL()[fail];
      head.textContent = c.head; runEl.hidden = false; runEl.innerHTML = c.run;
      q("[data-sw-acc-flow]").innerHTML = c.acc;
      q("[data-sw-qline]").textContent = c.ses;
      steps.innerHTML = c.steps.map(([cls, body], i) => `<li class="${cls}"><i></i><div><b>${(c.titles ?? titles())[i]}</b>${body}</div></li>`).join("");
      keys.innerHTML = "";
      display(...c.d);
      // every case had the sessions moving: that answer shown, locked; the backup made right after the window closed
      page.querySelectorAll<HTMLButtonElement>("[data-sw-q]").forEach((b) => { b.classList.toggle("on", b.dataset.swQ === "move"); b.classList.toggle("dis", b.dataset.swQ !== "move"); b.disabled = true; });
      q("[data-sw-bwhen]").textContent = fail === "window" ? "Not made: the window didn't close, so nothing moved" : `Made: before switch to ${T()} · 3 s`;
      w.clSwitchPending = { work: fail === "half" || fail === "undo" };
      return;
    }
    w.clSwitchPending = { work: false };
    // the accounts: NOW lit; under TO every standby account, most room first, the picked one lit in mint
    if (phase === "ready") {
      const now = box(inUse, true, B.use, "", '<small class="abox-note">Its limits stay in sight after the switch: it keeps a sign-in of its own.</small>');
      const pick = `<div class="acc-pick">${list.map((s) => box(s, false, s.email === to ? B.to : B.sb, s.email === to ? " sel" : "", "", ` data-sw-to="${s.email}"`)).join("")}</div>`;
      q("[data-sw-acc-flow]").innerHTML = flow("Now", now, "To", pick) + '<p class="g-note sub pick-note">Pick the account to switch to; the one with the most room is on top.</p>';
    } else if (phase === "done") {
      q("[data-sw-acc-flow]").innerHTML = flow("Now", box(target(), true, B.use), "Before", box(inUse, false, B.sb));
    } else {
      q("[data-sw-acc-flow]").innerHTML = flow("Now", box(inUse, true, B.use), "Next", box(target(), false, B.to));
    }
    // the sessions question, and the backup that comes with moving them
    q("[data-sw-qline]").textContent = phase === "ready"
      ? (answer === "move" ? `They move to ${T()}; one Return puts the sidebar back.` : answer === "leave" ? `They stay with ${from}; switch back to see them again.` : "Choose one to go on: nothing is chosen for you.")
      : "Your answer. It can't change while the switch runs; Cancel puts everything back.";
    q("[data-sw-bwhen]").textContent = answer === "leave" ? `None needed: the sessions stay with ${from}, so nothing of theirs changes`
      : at() >= 2 ? `Made: before switch to ${T()} · 3 s. The switch's receipt names it, so Undo and the backup point at each other.`
      : answer === "move" ? "Made now, because the sessions move: right after the window closes, before anything moves"
      : "Every time the sessions move: right after the window closes, before anything moves";
    // the steps, each checked before the next
    const n = at(), st = (i: number) => (n > i ? "done" : n === i ? "now" : "");
    const s1 = move ? [`${name}'s Claude window closes, then a backup`, "The window closes, about half a minute; then the backup, about 3 s, before anything moves."]
      : [`${name}'s Claude window closes`, "Only that window, for about half a minute; your other Claude windows stay open."];
    const s2 = answer === "" ? ["The sessions: waiting for your answer", `Move to ${T()}, or leave with ${from}.`]
      : move ? [`The sessions move to ${T()}`, "Same ids; nothing is copied. A receipt makes it undoable."]
      : [`The sessions stay with ${from}`, `Nothing is moved; the window shows ${T()}'s own sessions.`];
    const rows: [string, string, string][] = [
      [st(1), s1[0], n === 1 ? em("Window · closing…") : n > 1 ? (move ? chk("g", "Backup · 3 s ✓") : "") : sp(s1[1])],
      [st(2), s2[0], n === 2 ? em("Moving 14 sessions…") : n > 2 ? sp(move ? "Set aside, not deleted: Cancel puts them back." : "Nothing moved.") : sp(s2[1])],
      [st(3), `Claude Code signs in as ${T()}`, n === 3 ? em("Terminal · finish in the browser") : n > 3 ? chk("g", `Claude Code · ${T()} ✓`) : sp(`Terminal and the browser; cl_audit checks it's ${T()} before going on.`)],
      [st(4), `The Claude window signs in as ${T()}`, n === 4 ? em("Waiting for the window's sign-in") + sp(`Sign out there, then sign in as ${to}. cl_audit waits here until the window is on ${T()}.`) + keyRow(["data-sw-showwin", "Show the Claude window"])
        : n > 4 ? chk("g", `Window · ${T()} ✓`) : sp(`The window asks you to sign in again; cl_audit checks it's ${T()} before going on.`)],
    ];
    if (answer !== "leave") rows.push([st(5), "The sidebar, as before", n === 5 ? em("Press Return in “cl_audit · arrange sidebar”") : n > 5 ? chk("g", "2 sections, 3 groups, pins ✓") : sp("Press Return in the session that opens.")]);
    steps.innerHTML = rows.map(([c, t, d]) => `<li class="${c}"><i></i><div><b>${t}</b>${d}</div></li>`).join("");
    // the line at the top, the keys and the tile's display
    const label = ["", "the window", "the sessions", "Claude Code", "the Claude window", "press Return"][n] ?? "";
    if (phase === "ready") {
      head.innerHTML = `Switch Claude ${name} to <span class="tn">${T()}</span>`; runEl.hidden = true;
      keys.innerHTML = K("data-sw-back", "Cancel") + "<span></span>" + GO("data-sw-go", `Close and switch to ${T()}`, !answer);
      display("", "Switch from", "g", from);
    } else if (phase === "done") {
      head.textContent = `Claude ${name} switched to ${T()}`; runEl.hidden = false;
      runEl.innerHTML = run(`<span class="g">Claude ${name} is on ${T()}</span> <em>· ${from} on standby</em>`, K("data-sw-undoswitch", "Undo this switch"), K("data-sw-back", `Back to ${name}'s settings`));
      keys.innerHTML = "";
      display("", "Switched to", "g", T());
    } else {
      head.textContent = `Switching Claude ${name} to ${T()}`; runEl.hidden = false;
      runEl.innerHTML = run(`<span class="b">Switching</span> <em>· step ${n} of ${answer === "leave" ? 4 : 5} · ${label}</em>`, STOP("data-sw-cancel", "Cancel switch, put everything back"));
      keys.innerHTML = "<span></span>" + STOP("data-sw-cancel", "Cancel switch");
      display("b", "Switching ●", "b", `to ${T()}`);
    }
  };
  // the steps run on by themselves in the demo; with the sessions left, there's no sidebar step
  const NEXT: Partial<Record<Phase, [Phase, number]>> = { closing: ["moving", 1500], moving: ["code", 1500], code: ["window", 2600], window: ["sidebar", 2600], sidebar: ["done", 2600] };
  const go = (p: Phase) => {
    clearTimeout(timer); phase = p === "sidebar" && answer === "leave" ? "done" : p; draw();
    const nx = NEXT[phase];
    if (nx) timer = window.setTimeout(() => go(nx[0]), nx[1]);
  };

  page.addEventListener("click", (e) => {
    const t = e.target as HTMLElement, has = (s: string) => t.closest<HTMLElement>(s);
    let b: HTMLElement | null;
    if ((b = has("[data-sw-to]")) && phase === "ready") { to = b.dataset.swTo!; draw(); return; }
    if ((b = has("[data-sw-q]")) && phase === "ready") { answer = b.dataset.swQ as "move" | "leave"; draw(); return; }
    if ((b = has("[data-sw-fail]"))) { clearTimeout(timer); if (phase === "fail" && fail === b.dataset.swFail) { phase = "ready"; } else { phase = "fail"; fail = b.dataset.swFail as Fail; } draw(); return; }
    if (has("[data-sw-back]")) { clearTimeout(timer); hooks.close(); return; }
    if (has("[data-sw-go]")) {
      q("[data-sw-c-title]").textContent = `Switch Claude ${name} to ${T()}?`;
      q("[data-sw-c-text]").textContent = answer === "move"
        ? `${name}'s Claude window closes and a backup is made. Its 14 sessions (and 3 archived) and 2 scheduled tasks move to ${T()}, with a receipt to undo it. Then Claude Code signs in as ${T()} in Terminal and the browser, and the window opens for its own sign-in. Once it's on ${T()}, a session opens there to arrange the sidebar: press Return in it.`
        : `${name}'s Claude window closes; the sessions stay with ${from}. Then Claude Code signs in as ${T()} in Terminal and the browser, and the window opens for its own sign-in.`;
      q("[data-sw-confirm]").hidden = false; q<HTMLButtonElement>("[data-sw-yes]").focus(); return;
    }
    if (has("[data-sw-no]")) { q("[data-sw-confirm]").hidden = true; return; }
    if (has("[data-sw-yes]")) { q("[data-sw-confirm]").hidden = true; go("closing"); return; }
    if (has("[data-sw-cancel]")) { clearTimeout(timer); phase = "fail"; fail = "cancel"; draw(); return; }
    if (has("[data-sw-again]")) { phase = "ready"; draw(); return; }
    if (has("[data-sw-undo]")) { phase = "fail"; fail = "cancel"; draw(); return; }
    if (has("[data-sw-undoswitch]")) { phase = "ready"; draw(); showWhatNow("Undo this switch", "", `It puts ${name} back on ${from}: the same switch the other way, and the sessions come back if they moved. This is a demo, so nothing changed.`); return; }
    const notes: [string, string, string][] = [
      ["[data-sw-showwin]", "Show the Claude window", `${name}'s Claude window comes forward. This is a demo, so nothing opens.`],
      ["[data-sw-signin]", "Sign in again…", `Claude Code's own sign-in opens in Terminal again, with ${to} filled in. This is a demo, so nothing opens.`],
      ["[data-sw-receipt]", "Show the receipt", "The switch's receipt opens in Finder: what moved, and where it's parked. This is a demo, so nothing opens."],
      ["[data-sw-settings]", "Open System Settings", "Privacy & Security ▸ Automation opens, where cl_audit can be allowed to control Claude. This is a demo, so nothing opens."],
      ["[data-sw-open]", "Open the session again", `“cl_audit · arrange sidebar” opens in ${name}'s Claude window. This is a demo, so nothing opens.`],
    ];
    for (const [sel, title, text] of notes) if (has(sel)) { showWhatNow(title, "", text); return; }
  });
  page.addEventListener("keydown", (e) => { if (e.key === "Escape" && !q("[data-sw-confirm]").hidden) q("[data-sw-no]").click(); });

  return {
    /** Opens the page with an account picked (a standby address, or the one with the most room). */
    open(pickEmail?: string) {
      if (phase === "done" || (phase === "fail" && fail === "cancel")) phase = "ready";
      if (phase === "ready") { answer = ""; if (pickEmail && list.some((s) => s.email === pickEmail)) to = pickEmail; }
      draw();
    },
    /** Takes the tile's display away (the page closed): it shows only while the page is open. */
    hideDisplay() { const tile = hooks.tile(); tile?.classList.remove("sw-host"); const d = tile?.nextElementSibling; if (d?.matches(".sw-disp")) d.remove(); },
  };
}
