// Tests for src/data/experimental.mjs (the "Experimental" note and its {{experimental}} marker; run: npm test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { experimentalText, experimentalHTML, withExperimental, FLOWS } from "../src/data/experimental.mjs";

const where = "src/content/blog/host.md";

test("without a list the note names the five flows, in the hub's words", () => {
  assert.equal(experimentalText(),
    "Experimental: account switching, import, restore, export and Move to another Mac can lose data. Use them for testing, never on anything you can't afford to lose. cl_audit asks you to confirm the risk each time before they run.");
});

test("one flow names only that flow, in the singular", () => {
  assert.equal(experimentalText(["move"]),
    "Experimental: Move to another Mac can lose data. Use it for testing, never on anything you can't afford to lose. cl_audit asks you to confirm the risk each time before it runs.");
});

test("flows come out in a fixed order whatever order they are given in; making a profile the default is a flow too", () => {
  assert.match(experimentalText(["restore", "switch"]), /^Experimental: account switching and restore can lose data\./);
  assert.match(experimentalText(["default"]), /^Experimental: making a profile the default can lose data\. Use it /);
  assert.equal(Object.keys(FLOWS).length, 6);
});

test("the marker paragraph becomes the note; text around it stays", () => {
  const out = withExperimental("<p>One.</p>\n<p>{{experimental: move}}</p>\n<p>Two.</p>", where);
  assert.equal(out, `<p>One.</p>\n${experimentalHTML(["move"])}\n<p>Two.</p>`);
  assert.match(out, /<div class="exp-note" role="note"><p><strong>Experimental:<\/strong> Move to another Mac can lose data\./);
  assert.equal(withExperimental("<p>{{experimental}}</p>", where), experimentalHTML());
});

test("a page without a marker is unchanged", () => {
  assert.equal(withExperimental("<p>Plain.</p>", where), "<p>Plain.</p>");
});

test("an unknown flow, a second note and a marker inside a paragraph fail the build, naming the file", () => {
  const fails = (html, re) => assert.throws(() => withExperimental(html, where), (e) => re.test(e.message) && e.message.startsWith(`${where}: `));
  fails("<p>{{experimental: teleport}}</p>", /unknown flow/);
  fails("<p>{{experimental}}</p><p>{{experimental: move}}</p>", /more than one/);
  fails("<p>Text {{experimental}} more.</p>", /paragraph of its own/);
});
