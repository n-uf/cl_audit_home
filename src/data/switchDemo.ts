// The Switch page demo (26.11.18, "one-folder switching"), as the app's SwitchPage.swift draws it: runs a switch of the
// demo's "work" profile with sample timings, and shows the cases it can meet when something goes wrong. A switch happens in
// the profile's own folder: its Claude window closes, a backup is made, the Code-tab sessions and scheduled tasks move
// from the account in use to the new one, then Claude Code's own sign-in opens in Terminal with the address filled in
// and the folder is watched for up to 10 minutes. The sessions always move (there is no question), and the Claude app's
// sign-in is the person's: until they sign it in to the new account, the page says both plainly. Nothing on this Mac
// changes. settings.astro owns the page state (it hides the profile's settings while this page is open).
import { accounts, standby, offerOrder, shortName, type Standby } from "./demo";
import { limitsHTML } from "./panelView";
import { loadCardStyle } from "./prefs";
import { showWhatNow } from "./whatNow";

// "undoing": Undo the move putting the sessions back (the app's .moving phase, with a receipt)
type Phase = "ready" | "closing" | "moving" | "undoing" | "waiting" | "reached" | "other" | "timedOut" | "failed" | "undone";
type Case = "window" | "wrong" | "timeout" | "half" | "cancel";
type Step = "pending" | "now" | "waiting" | "done" | "failed";

export function initSwitch(page: HTMLElement, hooks: { close: () => void; tile: () => HTMLElement | null }) {
  const q = <T extends HTMLElement = HTMLElement>(s: string) => page.querySelector<T>(s)!;
  const work = accounts.find((x) => x.id === "work")!;
  const name = work.name, from = shortName(work.email), dir = work.dir;
  const windowWords = `${name}'s own window, opened from its Dock icon`;
  const list = offerOrder(standby.work);
  let to = list[0].email, phase: Phase = "ready", fail: "window" | "half" = "window", shown: Case | "" = "", timer = 0, until = "";
  const T = () => shortName(to), target = () => list.find((s) => s.email === to)!;
  /** The account the browser signs in as in "Wrong account": another of the profile's standby accounts. */
  const other = () => list.find((s) => s.email !== to)!;
  const O = () => shortName(other().email);
  const SES = "14 Code-tab sessions and 2 scheduled tasks";
  // what the switch's receipt still has moved after it stopped (SwitchRunner.movedWords): all of it once the move
  // finished (no sign-in), part of it when it stopped half way (the sessions go first, then the tasks)
  const MOVED = { all: "14 sessions, 2 tasks", half: "9 sessions" };
  const w = window as any;
  /** A run holds the profile's Claude window (closing, moving, waiting for the sign-in): a Restore waits for it. */
  const running = () => phase === "closing" || phase === "moving" || phase === "undoing" || phase === "waiting";
  // a Restore is refused only while a run holds the window; a switch that stopped half way no longer blocks it (26.11.18)
  w.clSwitchPending = { work: false };
  // a page swap (Astro view transition) drops this page: its timer must not run on into the next one
  document.addEventListener("astro:before-swap", () => { clearTimeout(timer); w.clSwitchPending = { work: false }; }, { once: true });

  // ── the parts ──
  const B = { use: '<span class="disp xs abox-badge"><span class="g">In use</span></span>', sb: '<span class="disp xs abox-badge"><em>Standby</em></span>',
    to: '<span class="disp xs abox-badge litp"><em>Switching</em> to</span>' };
  const lamp = (on: boolean) => `<i class="abox-lamp${on ? " on" : ""}"></i>`;
  const row = (label: string, box: string) => `<span class="lbl">${label}</span>${box}`;
  const sp = (t: string) => `<span>${t}</span>`;
  const note = (t: string) => `<small class="abox-note">${t}</small>`;
  /** The account in use: its limits (only it is read), and a line when the Claude app is on another account. */
  const inUse = (email: string, plan: string, content: string) =>
    `<div class="abox"><div class="abox-head">${lamp(true)}<span class="abox-t"><b class="email">${email}</b><small>${plan}</small></span>${B.use}</div>${content}</div>`;
  const nowBox = (line = "") => inUse(work.email, work.plan, `<div class="abox-limits">${limitsHTML("work", loadCardStyle(), false)}</div>${line ? note(line) : ""}`);
  /** A standby account: address, plan and when it was last in use. No limits: it isn't read. */
  const sbBox = (s: Standby, selected: boolean, badge: string, attr = "") =>
    `<div class="abox unlit${selected ? " sel" : ""}"${attr}><div class="abox-head">${lamp(false)}<span class="abox-t"><b class="email">${s.email}</b><small>${s.plan}</small></span>${badge}</div>${note(`Last in use ${s.lastInUse}.`)}</div>`;
  const K = (a: string, t: string) => `<button type="button" class="key k" ${a}>${t}</button>`;
  const GO = (a: string, t: string) => `<button type="button" class="pill small tint t-green" ${a}>${t}</button>`;
  const STOP = (a: string, t: string) => `<button type="button" class="pill small tint t-red" ${a}>${t}</button>`;
  const bar = (disp: string, ...ks: string[]) => `<span class="disp">${disp}</span><span class="spacer"></span>${ks.join("")}`;
  const chk = (cls: string, t: string) => `<div class="chk"><span class="disp"><span class="${cls}">${t}</span></span></div>`;
  const em = (t: string) => `<div class="chk"><span class="disp"><em>${t}</em></span></div>`;
  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

  // ── the title and the line at the top: how far it got, and the keys that lead out ──
  const title = () => {
    switch (phase) {
      case "closing": case "moving": case "undoing": case "waiting": return `Switching Claude ${name} to ${T()}`;
      case "reached": return `Switched Claude Code of ${name} to ${T()}`;
      case "other": return `Claude ${name} signed in as ${O()}`;
      default: return `Switch Claude ${name} to ${T()}`;
    }
  };
  const top = (): string => {
    const back = K("data-sw-back", `Back to ${name}'s settings`);
    switch (phase) {
      case "ready": return "";
      case "closing": return bar(`<span class="b">Switching</span> <em>· closing the window</em>`, STOP("data-sw-cancel", "Cancel"));
      case "moving": case "undoing": return bar(`<span class="b">Switching</span> <em>· moving sessions</em>`);
      case "waiting": return bar(`<span class="b">Switching</span> <em>· waiting · until ${until}</em>`, STOP("data-sw-cancel", "Cancel"));
      // Claude Code is on the new account; the Claude app (the account in use follows it) is still on the old one
      case "reached": return bar(`<span class="a">Claude Code on ${T()}</span> <em>· the Claude app still on ${from}</em>`, K("data-sw-backswitch", `Switch back to ${from}…`), GO("data-sw-back", `Back to ${name}'s settings`));
      case "other": return bar(`<span class="a">Signed in as ${O()}</span> <em>· not ${T()}</em>`, GO("data-sw-retry", `Sign in as ${T()} again`), K("data-sw-undo", "Undo the move"));
      case "timedOut": return bar(`<span class="a">No sign-in</span> <em>· sessions on ${T()}</em>`, GO("data-sw-retry", "Try again"), K("data-sw-undo", "Undo the move"), back);
      case "failed": return fail === "half"
        ? bar(`<span class="r">Stopped</span> <em>· Undo puts it back</em>`, GO("data-sw-retry", "Try again"), K("data-sw-undo", "Undo the move"), back)
        : bar(`<span class="r">Not started</span> <em>· nothing changed</em>`, GO("data-sw-retry", "Try again"), back);
      case "undone": return bar(`<span class="g">Undone</span> <em>· still on ${from}</em>`, GO("data-sw-back", `Back to ${name}'s settings`));
    }
  };

  // ── Accounts: Now (the account in use, its limits), then To / Next / Wanted (a standby account, no limits) ──
  const accountsHTML = () => {
    const wanted = (badge: string) => `<div class="acc-pick">${sbBox(target(), true, badge)}</div>`;
    switch (phase) {
      case "ready": {
        const pick = `<div class="acc-pick" role="radiogroup" aria-label="Switch to">${list.map((s) => sbBox(s, s.email === to, s.email === to ? B.to : B.sb,
          ` data-sw-to="${s.email}" role="radio" tabindex="0" aria-checked="${s.email === to}" aria-label="${s.email}"`)).join("")}</div>`;
        return row("Now", nowBox()) + row("To", pick) + (list.length > 1 ? '<p class="g-note sub pick-note">The one offered first is on top. Click another to switch to it instead.</p>' : "");
      }
      // the lit "Switching to" badge only while it is waited for ("Next"), as the app's `going`
      case "closing": case "moving": case "undoing": return row("Now", nowBox()) + row("Wanted", wanted(B.sb));
      case "waiting": return row("Now", nowBox()) + row("Next", wanted(B.to));
      // the Claude app is still on the account in use, and Claude Code is on the new one (cl_audit 26.11.25, AccountResolver's
      // SplitUsage): nothing shows Claude Code's numbers as the profile's, so the box says the switch waits for the app's
      // sign-in. No numbers (the old account's are gone; the plan goes with them) and no key to log Claude Code in.
      case "reached": return row("Now", inUse(work.email, "", note(`Switched to ${to}: sign the Claude app in to ${to} to finish`) + note("No numbers yet: the agent reads them within a few minutes.")));
      // the folder is on another of the profile's accounts now, and that is the one in use (no numbers read yet)
      case "other": return row("Now", inUse(other().email, other().plan, note("No numbers yet: the agent reads them within a few minutes."))) + row("Wanted", wanted(B.sb));
      default: return row("Now", nowBox()) + row("Wanted", wanted(B.sb));
    }
  };

  // ── What changes (before and while it runs), What changed (after) ──
  const srow = (label: string, text: string) => `<div class="srow"><span>${label}</span><span class="v-soft">${text}</span></div>`;
  const line = (t: string) => `<p class="g-note sub">${t}</p>`;
  const stays = srow("Stays", `${name}'s name, Dock icon, look, folder and settings`);
  const changes = (): [string, string] => {
    switch (phase) {
      case "reached": return ["What changed", [
        srow("Claude Code", `Terminal and editors on ${dir} work on ${T()} now, sessions that were running included.`),
        srow("Sessions", `${SES} moved to ${T()}, with a backup made first. Claude Code's transcripts stayed in ${dir}.`),
        srow("Claude window", `Claude Code is on ${T()}. The Claude app is still on ${from}: sign it in to ${T()} there to finish (${windowWords}). Until then ${from} is the account in use.`),
        srow("Stayed", `${name}'s name, Dock icon, look, folder and settings`),
      ].join("")];
      case "other": return ["What changed", [
        srow("Claude Code", `Terminal and editors on ${dir} signed in as ${O()}, not ${T()}.`),
        srow("Sessions", `${cap(SES)} moved to ${T()} already. Sign in as ${T()} again, or Undo the move to put them back under ${from}.`),
      ].join("")];
      case "timedOut": return ["What changed", srow("Sessions", `${cap(MOVED.all)} moved to ${T()}; Claude Code on ${dir} is still on ${from}. Try again, or Undo the move to put them back.`)];
      case "failed": return ["What changed", fail === "half"
        ? srow("Sessions", `${cap(MOVED.half)} moved to ${T()}; Claude Code on ${dir} is still on ${from}. Try again, or Undo the move to put them back.`)
        : srow("Nothing", `${name} is still on ${from}: Claude Code on ${dir}, its sessions, the Claude window and ${name}'s settings are as they were.`)];
      case "undone": return ["What changed", srow("Nothing", `The move is undone: ${name}'s sessions and scheduled tasks are back under ${from}, and Claude Code is still on ${from}.`)];
      default: return ["What changes", [
        srow("Claude Code", `Terminal and editors using ${dir} move to ${to}, sessions running now included; the Claude app keeps its own sign-in. Finish the sign-in in Terminal and the browser as that account.`),
        srow("Sessions", `${SES} move from ${from} to ${T()}, inside ${name}'s folder, with a backup made first. A session Claude Code is running stays with ${from} until a later switch. Transcripts stay in ${dir}.`),
        srow("Claude window", `It closes for the move (${windowWords}). Sign it in to ${T()} yourself when you open it again: cl_audit never signs it in or out.`),
        stays,
        line(`${from} stays on ${name} as a standby account: nothing read, switch back any time.`),
      ].join("")];
    }
  };

  // ── Steps: the window closes, the sessions move, Claude Code's sign-in opens, finish it in the browser, the check ──
  const state = (n: number): Step => {
    const k = 2;
    switch (phase) {
      case "ready": case "undone": return "pending";
      case "closing": return n === 1 ? "now" : "pending";
      case "moving": case "undoing": return n === 1 ? "done" : n === 2 ? "now" : "pending";
      case "waiting": return n <= k + 1 ? "done" : n === k + 2 ? "waiting" : "now";
      case "reached": return "done";
      case "other": return n < k + 3 ? "done" : "failed";
      case "timedOut": return n <= k + 1 ? "done" : n === k + 2 ? "failed" : "pending";
      // the failed step is the one that stopped, as SwitchPage marks it since 26.11.20: 1 (the window didn't close)
      // or 2 (the backup or the sessions' move)
      case "failed": { const at = fail === "window" ? 1 : 2; return n < at ? "done" : n === at ? "failed" : "pending"; }
    }
  };
  /** What the folder says now: ✓ on the account wanted, amber on another. */
  const check = () => phase === "reached" ? chk("g", `Claude Code · ${T()} ✓`)
    : phase === "other" ? chk("a", `Claude Code · ${O()} · not ${T()}`)
    : phase === "waiting" ? em(`Claude Code · ${from} now`) : "";
  const stepsHTML = () => {
    const rows: [string, string][] = [
      [`${name}'s Claude window closes`, "Only that window, by its own quit; it stays closed until the sign-in ends."],
      [`Its sessions move to ${T()}`, `A backup first, then ${SES}, each checked; a receipt keeps Undo possible.`],
      ["Claude Code's sign-in opens in Terminal", `For ${dir}, with ${to} filled in.`],
      [`Finish it in the browser as ${T()}`, "If the browser is signed in to claude.ai as someone else, switch its account there first."],
      ["cl_audit checks the account", "The folder is looked at every 2 seconds, for up to 10 minutes."],
    ];
    const cls: Record<Step, string> = { pending: "", now: "now", waiting: "warn", done: "done", failed: "fail" };
    return rows.map(([t, d], i) => `<li class="${cls[state(i + 1)]}"><i></i><div><b>${t}</b>${sp(d)}${i === 4 ? check() : ""}</div></li>`).join("");
  };
  const statusLine = (): string => {
    switch (phase) {
      case "closing": return `Waiting for ${name}'s Claude window to quit (it may ask about work under way). Nothing has moved yet.`;
      case "moving": return "Making the backup, then moving the sessions. The window stays closed.";
      case "undoing": return "Putting the sessions back.";
      case "waiting": return `The sessions are under ${T()} now; Claude Code stays on ${from} until Claude Code is signed in as another account. Back keeps waiting.`;
      case "reached": return `Open ${name}'s Claude window and sign it in to ${T()}: cl_audit doesn't sign the app in or out.`;
      case "other": return `${name} works on ${O()} now, and ${from} is on standby. To get ${T()}, switch the browser's claude.ai account first, then sign in again.`;
      case "timedOut": return `No sign-in came in 10 minutes: Claude Code is still on ${from}.`;
      case "failed": return fail === "half" ? "The profile's Claude window opened during the switch; stopped. Undo puts back what moved."
        : `${name}'s Claude window didn't close; it may be asking about work under way. Answer it, then try again. Nothing moved.`;
      default: return "";
    }
  };
  const keysHTML = () => {
    const back = '<button type="button" class="sw-plain" data-sw-back>Back</button><span></span>';
    if (phase === "ready") return back + GO("data-sw-go", `Switch to ${T()}`);
    if (phase === "waiting") return back + K("data-sw-term", "Show Terminal");
    return back;
  };

  // ── the profile tile's display, while the page is open ──
  const display = (l1c: string, l1: string, l2c: string, l2: string, title = "") => {
    const tile = hooks.tile();
    if (!tile) return;
    let d = tile.nextElementSibling as HTMLElement | null;
    if (!d?.matches(".sw-disp")) { d = document.createElement("span"); d.className = "disp sw-disp two"; tile.after(d); }
    tile.classList.add("sw-host");
    d.title = title;
    d.innerHTML = `<span class="l1 ${l1c}">${l1}</span><span class="l2 ${l2c}">${l2}</span>`;
  };
  const removeDisplay = () => {
    const tile = hooks.tile();
    tile?.classList.remove("sw-host");
    const d = tile?.nextElementSibling;
    if (d?.matches(".sw-disp")) d.remove();
  };
  // as the app's RunnerTileDisplay: one line pair per state, none while the window closes, the sessions move or after Undo
  const tileDisplay = () => {
    switch (phase) {
      case "ready": return display("", "Switch from", "g", from);
      case "waiting": return display("b", "Switching ●", "b", `to ${T()}`);
      case "reached": return display("", "Switched to", "g", T());
      case "other": return display("", "Signed in as", "a", O());
      case "timedOut": return display("", "No sign-in", "a", "try again");
      case "failed": return fail === "half"
        ? display("", "Stopped part way", "r", `${MOVED.half} moved · Undo puts them back`)
        : display("", "Not started", "r", "nothing changed");
      default: return removeDisplay();
    }
  };

  // ── drawing ──
  const draw = () => {
    w.clSwitchPending = { work: running() };
    q("[data-sw-head]").textContent = title();
    const t = top(), runEl = q("[data-sw-run]");
    runEl.hidden = !t; runEl.innerHTML = t;
    q("[data-sw-demo]").hidden = running();
    page.querySelectorAll<HTMLElement>("[data-sw-fail]").forEach((b) => b.classList.toggle("on", b.dataset.swFail === shown));
    q("[data-sw-acc-flow]").innerHTML = accountsHTML();
    const [ct, ch] = changes();
    q("[data-sw-changes-t]").textContent = ct; q("[data-sw-changes]").innerHTML = ch;
    // once undone, no steps: ticked steps would read as if the move had happened
    q("[data-sw-stepscard]").hidden = phase === "undone";
    const steps = q("[data-sw-steps]");
    steps.classList.toggle("reached", phase === "other" || phase === "timedOut" || phase === "failed");
    steps.innerHTML = stepsHTML();
    q("[data-sw-keys]").innerHTML = keysHTML();
    const s = statusLine(), l = q("[data-sw-line]");
    l.hidden = !s; l.textContent = s; l.classList.toggle("bad", phase === "failed");
    tileDisplay();
  };
  // the steps run on by themselves in the demo: the window closes, the sessions move, the sign-in is waited for
  const NEXT: Partial<Record<Phase, [Phase, number]>> = { closing: ["moving", 1500], moving: ["waiting", 1800], undoing: ["undone", 1200], waiting: ["reached", 4200] };
  const go = (p: Phase) => {
    clearTimeout(timer); phase = p;
    if (p === "waiting") until = new Date(Date.now() + 10 * 60000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    draw();
    const nx = NEXT[phase];
    if (nx) timer = window.setTimeout(() => go(nx[0]), nx[1]);
  };
  /** A "what can go wrong" key: the page as the app shows it after that case; the same key again goes back to the start. */
  const pickCase = (c: Case) => {
    clearTimeout(timer);
    if (shown === c) { shown = ""; phase = "ready"; draw(); return; }
    shown = c;
    if (c === "window" || c === "half") { phase = "failed"; fail = c; }
    else phase = c === "wrong" ? "other" : c === "timeout" ? "timedOut" : "ready";   // Cancel puts the page back at the start
    draw();
  };

  page.addEventListener("click", (e) => {
    const t = e.target as HTMLElement, has = (s: string) => t.closest<HTMLElement>(s);
    let b: HTMLElement | null;
    if ((b = has("[data-sw-to]")) && phase === "ready") { to = b.dataset.swTo!; draw(); page.querySelector<HTMLElement>(`[data-sw-to="${to}"]`)?.focus(); return; }
    if ((b = has("[data-sw-fail]"))) { pickCase(b.dataset.swFail as Case); return; }
    if (has("[data-sw-back]")) { clearTimeout(timer); hooks.close(); return; }
    if (has("[data-sw-go]")) { shown = ""; go("closing"); return; }
    // Cancel: stops waiting and puts the page back at the start (the demo doesn't model a move that was already made)
    if (has("[data-sw-cancel]")) { clearTimeout(timer); shown = "cancel"; phase = "ready"; draw(); return; }
    // Try again / Sign in again: a switch that never started starts over; one that moved the sessions only signs in again
    if (has("[data-sw-retry]")) { shown = ""; go(phase === "failed" && fail === "window" ? "closing" : "waiting"); return; }
    // Undo the move: the sessions are put back (a short "moving" phase), then the page says it is undone
    if (has("[data-sw-undo]")) { shown = ""; go("undoing"); return; }
    // Switch back: the app opens this page with the account it came from picked. The demo can't model work now being on
    // team-2, so it says what happens and leaves the page.
    if (has("[data-sw-backswitch]")) {
      showWhatNow(`Switch back to ${from}…`, "", `The way back is a switch the other way: the Switch page opens with ${from} picked, ${name}'s sessions move back to ${from} and Claude Code on ${dir} signs in as ${from} again. This is a demo, so nothing changed.`);
      hooks.close();
      return;
    }
    if (has("[data-sw-term]")) { showWhatNow("Show Terminal", "", `Terminal comes forward with Claude Code's own sign-in for ${dir}, with ${to} filled in. This is a demo, so nothing opens.`); return; }
  });

  return {
    /** Opens the page with an account picked (a standby address, or the one a full limit offers first). */
    open(pickEmail?: string) {
      if (!running()) { phase = "ready"; shown = ""; to = pickEmail && list.some((s) => s.email === pickEmail) ? pickEmail : list[0].email; }
      if (NEXT[phase]) go(phase); else draw();   // a run paused by closing the page goes on
    },
    /** Takes the tile's display away (the page closed): it shows only while the page is open; a run pauses. */
    hideDisplay() { clearTimeout(timer); removeDisplay(); },
  };
}
