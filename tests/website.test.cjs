'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = ['index.html','about us.html','buy.html','contact us.html','privacy policy.html','terms of service.html'];

for (const page of pages) {
  test(page + ': local links resolve and scripts parse', () => {
    const html = fs.readFileSync(path.join(root,page), 'utf8');
    assert.match(html, /<meta name="description"/i);
    assert.match(html, /<main\b/i);
    assert.match(html, /prefers-reduced-motion/i);
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      const href = match[1];
      assert.notEqual(href, '#', 'placeholder anchor in ' + page);
      if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
      const relative = decodeURIComponent(href.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(path.join(root, relative)), page + ' has broken link: ' + href);
    }
    for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
      assert.doesNotThrow(() => new Function(match[1]), page + ' has invalid JS');
    }
    for (const tag of ['div','section','main','header','footer','nav']) {
      const starts = (html.match(new RegExp('<' + tag + '\\b','gi')) || []).length;
      const ends = (html.match(new RegExp('</' + tag + '>','gi')) || []).length;
      assert.equal(starts, ends, 'unbalanced ' + tag + ' tags in ' + page);
    }
  });
}
test('no placeholder customer logos/testimonials or fake working checkout', () => {
  const home = fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.doesNotMatch(home, /Sarah Jenkins|CTO, QuantumLeap|placehold\.co\/.*?StartupHub/i);
  assert.doesNotMatch(home, /slick-carousel|pravatar\.cc/i);
  const checkout = fs.readFileSync(path.join(root,'buy.html'),'utf8');
  assert.doesNotMatch(checkout, /<form[^>]+action="#"/i);
  assert.match(checkout, /No orders or payments can be accepted/i);
  const contact = fs.readFileSync(path.join(root,'contact us.html'),'utf8');
  assert.doesNotMatch(contact, /<form[^>]+action="#"/i);
  assert.match(contact, /previous form did not deliver/i);
});
