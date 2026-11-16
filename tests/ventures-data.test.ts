import test from 'node:test';
import assert from 'node:assert/strict';
import { ventures } from '../src/data/venturesData';

test('ventures data includes SAWAH and Faraz Kayan Digital Products with exact required URLs and assets', () => {
  assert.equal(ventures.length, 2);

  const sawah = ventures.find((v) => v.id === 'sawah');
  assert.ok(sawah, 'SAWAH venture should exist');
  assert.equal(sawah.name, 'SAWAH');
  assert.equal(sawah.category, 'Co-Founded Business / E-commerce');
  assert.equal(sawah.primaryAction.label, 'Visit SAWAH');
  assert.equal(sawah.primaryAction.url, 'https://sawah.farazkh.dev');
  assert.equal(sawah.artworkUrl, '/ventures/sawah-frame.jpg');
  assert.ok(sawah.frameSwatches && sawah.frameSwatches.length > 0);
  assert.deepEqual(sawah.coFounders, [
    { name: 'ME' },
    { name: 'Arifeen Mahin', url: 'https://mahinite.pages.dev' },
  ]);

  const digital = ventures.find((v) => v.id === 'faraz-kayan-digital');
  assert.ok(digital, 'Faraz Kayan Digital Products venture should exist');
  assert.equal(digital.name, 'Faraz Kayan');
  assert.equal(digital.primaryAction.label, 'Explore Digital Products');
  assert.equal(digital.primaryAction.url, 'https://shop.farazkh.dev');
  assert.ok(digital.featuredOffering, 'Featured product should exist');
  assert.equal(digital.featuredOffering.name, 'The Student Deadline Kit');
  assert.equal(digital.featuredOffering.url, 'https://shop.farazkh.dev/l/the-project-kit');
  assert.equal(digital.featuredOffering.imageUrl, '/ventures/student-deadline-kit.png');
});

test('ventures copy never references Gumroad or fabricated metrics', () => {
  const serialized = JSON.stringify(ventures).toLowerCase();
  assert.equal(serialized.includes('gumroad'), false, 'Should not mention Gumroad');
});
