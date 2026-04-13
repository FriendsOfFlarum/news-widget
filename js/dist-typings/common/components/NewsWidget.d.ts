import type Mithril from 'mithril';
import Widget, { WidgetAttrs } from 'ext:fof/forum-widgets-core/common/components/Widget';
export default class NewsWidget<T extends WidgetAttrs> extends Widget<T> {
    private newslines;
    private line;
    private switching;
    oninit(vnode: Mithril.Vnode<T, this>): void;
    className(): string;
    icon(): string;
    title(): string;
    content(): Mithril.Children;
}
