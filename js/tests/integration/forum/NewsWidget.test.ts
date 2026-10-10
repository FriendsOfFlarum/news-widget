import { jest } from '@jest/globals';
import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import mq from 'mithril-query';
import app from 'flarum/forum/app';
import NewsWidget from '../../../src/common/components/NewsWidget';

beforeAll(() => bootstrapForum());

describe('NewsWidget', () => {
  const serve = (lines: string[]) => app.forum.pushData({ attributes: { 'fof-news-widget.lines': lines } } as any);

  const mount = () => mq(NewsWidget as any, { state: {} });

  const currentLine = (widget: any): string => widget.first('.FoF-NewsWidget-line--current').textContent;

  beforeAll(() => app.boot());

  beforeEach(() => {
    jest.useFakeTimers();
    serve(['First', 'Second', 'Third']);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('advances one line every 7 seconds however often it is redrawn', () => {
    const widget = mount();

    expect(currentLine(widget)).toBe('First');

    for (let i = 0; i < 5; i++) widget.redraw();

    jest.advanceTimersByTime(6999);
    widget.redraw();
    expect(currentLine(widget)).toBe('First');

    jest.advanceTimersByTime(1);
    widget.redraw();
    expect(currentLine(widget)).toBe('Second');

    for (let i = 0; i < 5; i++) widget.redraw();

    jest.advanceTimersByTime(6999);
    widget.redraw();
    expect(currentLine(widget)).toBe('Second');

    jest.advanceTimersByTime(1);
    widget.redraw();
    expect(currentLine(widget)).toBe('Third');
  });

  it('stops rotating and redrawing the page once it is removed', () => {
    const redraw = jest.spyOn(m, 'redraw');
    const widget = mount();

    widget.onremove();
    jest.advanceTimersByTime(7000 * 3);

    expect(redraw).not.toHaveBeenCalled();
  });
});
