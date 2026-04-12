import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import registerWidget from '../common/registerWidget';
import Alert from 'flarum/common/components/Alert';
import type ExtensionPage from 'flarum/admin/components/ExtensionPage';

app.initializers.add('fof/news-widget', () => {
  registerWidget();

  const settingKey = 'fof-news-widget.lines';

  app.extensionData
    .for('fof-news-widget')
    .registerSetting(function (this: ExtensionPage) {
      return (
        <div className="Form-group FoF-NewsWidget-htmlWarning">
          <Button
            className="Button"
            onclick={() => {
              const value = JSON.parse(this.setting(settingKey)() || '[]');

              this.setting(settingKey)(JSON.stringify([...value, '']));
            }}
          >
            {app.translator.trans('fof-news-widget.admin.settings.add_line')}
          </Button>
          <Alert dismissible={false}>{app.translator.trans('fof-news-widget.admin.settings.html_warning')}</Alert>
        </div>
      );
    })
    .registerSetting(function (this: ExtensionPage) {
      const value = JSON.parse(this.setting(settingKey)() || '[]');

      if (!value.length) return;

      return (
        <div className="Form-group">
          <label>{app.translator.trans('fof-news-widget.admin.settings.lines')}</label>
          {value.map((line: string, index: number) => (
            <div className="FoF-NewsWidget-lineSetting">
              <textarea
                className="FormControl"
                oninput={(e: any) => {
                  value[index] = e.target.value;
                  this.setting(settingKey)(JSON.stringify([...value]));
                }}
              >
                {line}
              </textarea>
              <Button
                className="Button Button--icon"
                icon="fas fa-trash"
                onclick={() => {
                  this.setting(settingKey)(JSON.stringify([...value.filter((l: string, i: number) => i !== index)]));
                }}
              />
            </div>
          ))}
        </div>
      );
    });
});
