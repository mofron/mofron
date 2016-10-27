try {
    app.view.text.top.overview = 'このページではmofron.jsを構成している各機能について説明します。';
    app.view.text.top.overview = app.view.text.top.overview + '対象者はmofron.jsを使用してWeb画面を開発する方です。';
    app.view.text.top.overview = app.view.text.top.overview + '初めてmofron.jsを使用する方は<a href="./">クィックスタートガイド</a>をご確認ください。';
} catch (e) {
    console.error(e.stack);
}
