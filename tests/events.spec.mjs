import { expect, test } from '@playwright/test';

test('filters local events and opens the selected event on the map', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && message.text().startsWith('errorHandler')) {
      errors.push(message.text());
    }
  });

  await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ body: '' }));
  const mapScript = String.raw`
    function Coordinate(x, y) {
      if (!(this instanceof Coordinate)) return new Coordinate(x, y);
      Object.assign(this, { x, y });
    }
    class MapView {
      constructor(id) { this.element = document.getElementById(id); }
      getPanes() { return { floatPane: this.element }; }
      setZoom() {}
      setCenter() {}
    }
    class Marker {
      constructor(options) { Object.assign(this, options); }
      setIcon() {}
      setZIndex() {}
      getPosition() { return this.position; }
    }
    class Overlay {
      set(key, value) { this[key] = value; }
      setMap() {}
    }
    window.naver = { maps: {
      Map: MapView, Marker, OverlayView: Overlay,
      Size: Coordinate, Point: Coordinate, LatLng: Coordinate,
      Position: { BOTTOM_LEFT: 0 },
      Event: { once(target, event, listener) { listener(); }, addListener() {}, addDOMListener() {} },
      Util: {
        extend: Object.assign,
        forEach(object, callback) {
          for (const [key, value] of Object.entries(object)) callback(value, key);
        },
        ClassExtend(Child, Parent, methods) {
          Child.prototype = Object.assign(Object.create(Parent.prototype), methods);
        },
        noop() {},
      },
    } };
  `;
  await page.route(/\/openapi\/v3\/maps\.js\?/, route =>
    route.fulfill({ contentType: 'application/javascript', body: mapScript })
  );

  await page.route('**/api/**/culturalEventInfo/**', route =>
    route.fulfill({
      json: {
        culturalEventInfo: {
          row: new URL(route.request().url()).pathname.endsWith('/1/1000')
            ? [{ TITLE: '서울 음악회', PLACE: '서울광장', STRTDATE: '2000-01-01', END_DATE: '2099-12-31', LAT: '126.978', LOT: '37.5665' }]
            : [],
        },
      },
    })
  );

  await page.goto('/');
  await expect(page).toHaveTitle('문화의 날');
  const search = page.getByPlaceholder('찾으실 문화행사명을 입력해 주세요');
  await search.focus();
  await expect(page.getByText('서울 음악회', { exact: true })).toBeVisible();
  await search.fill('없는 행사');
  await search.press('Enter');
  await expect(page.getByText('조회된 문화행사가 없습니다.')).toBeVisible();

  await search.fill('음악회');
  await search.press('Enter');
  const result = page.getByText('서울 음악회', { exact: true });
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.locator('.bottom-sheet')).toContainText('서울광장');
  expect(errors).toEqual([]);
});
