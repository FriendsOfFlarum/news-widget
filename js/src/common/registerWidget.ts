import app from 'flarum/common/app';
import Widgets from 'ext:flarum/extensions/fof-forum-widgets-core/common/extend/Widgets';

import NewsWidget from './components/NewsWidget';

export default function () {
  new Widgets()
    .add({
      key: 'news',
      component: NewsWidget,
      isDisabled: () => !app.forum.attribute<string>('fof-news-widget.lines').length,
      isUnique: true,
      placement: 'top',
      position: 1,
    })
    .extend(app, 'fof-news-widget');
}
