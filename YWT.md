#各jsの役割

## app/custom-modeler/custom
- CustomContextPadProvider.js ContextPadの情報を提供する
- CustomElementFactory.js Elementを生成する
- CustomPalette.js パレットを描画する
- CustomRenderer.js パレットからキャンバスにドラッグ＆ドロップした時の図のレンダリング定義
- CustomRules 図を置くときのルールを定義するものだと思うが、未検証
- CustomUpdater 未検証

## app/custom-property
- CustomPropertyProvider.js CustomPropertyの情報を提供する

## app/custom-property/parts
- XXXProps.js CustomPropertyの1部品

## app/descriptors
- jsr352.json custom-propertyの編集をexportされるxmlに反映させるために使用する

##試してわかったこと
- CustomElementとCustomPropertyを同時に使おうとするとエラーが起きる

CustomElementFactoryにてElement生成時に該当jobにbusinessObjectなるプロパティが設定されていないため、エラーが起きることはわかったが、なぜ設定されないのかについては未検証

##次やること
jsr352に基づいたすべてのプロパティを設定し、アウトプットされるxmlのフォーマットを確定させる（関）

# bpmn diagram, svg の抽出

Server Post用のbpmn diagram(xml)と、job detail画面で表示する用のsvgの取得方法。

## Y

両者を提供するmethodを特定し、jobstreamer consoleへの埋め込み方を検討する。 223kazuki

## W

### bpmn diagram

console から別 windows を開いて編集 / 保存が出来る想定。
"Save"ボタン押下でxmlをPOSTする。

```
;; 適切なモジュールを読み込んだ後で Modeler を生成。
var modeler = new CustomModeler({
  container: '#canvas',
  keyboard: { bindTo: document },
  propertiesPanel: {
      parent: '#js-properties-panel'
  },
  additionalModules: [
      propertiesPanelModule,
      propertiesProviderModule
  ],
moddleExtensions: {
  jsr352: jsr352ModdleDescriptor,
  camunda: camundaModdleDescriptor
}
});

// jobDiagram は jobname を指定して control-bus から取得
var jobDiagram = require('../resources/job.bpmn');

modeler.importXML(diagram, function(err) {
if (err) {
  console.error('something went wrong:', err);
}
});

// 下記関数を"Save"ボタンにdispatch
function saveJob(modeler) {
  modeler.saveDiagram(function(err, xml) {
    console.log(xml);
    // XML POST
  });
};
```

### svg

bpmn diagram 同様にjsで生成可能ではあるが、bpmn-jsの依存を最小限に留めるためには svg も datomic 上に保存した方がよい。
その場合、job 編集を別ウィンドウで実行してウィンドウを閉じたタイミングで job 詳細画面上の svg を再読み込みすればよい。
job 編集画面で "Save" ボタンにディスパッチされる関数は下記の通りになる。

```
// 下記関数を"Save"ボタンにdispatch
function saveJob(modeler) {
  modeler.saveDiagram(function(err, xml) {
    console.log(xml);
    // XML POST
  });
  modeler.saveSVG(function(err, svg) {
    console.log(svg);
    // svg POST
  });
};
```

## T

上記の想定で job 詳細画面、編集画面のサンプルを実装する。