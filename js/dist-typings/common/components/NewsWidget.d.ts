import type Mithril from 'mithril';
import Widget, { WidgetAttrs } from 'ext:fof/forum-widgets-core/common/components/Widget';
export default class NewsWidget<T extends WidgetAttrs> extends Widget<T> {
    private newslines;
    private line;
    private rotation?;
    oninit(vnode: Mithril.Vnode<T, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<T, this>): void;
    onremove(vnode: Mithril.VnodeDOM<T, this>): void;
    className(): string;
    icon(): string;
    title(): string;
    content(): Mithril.Children;
}
