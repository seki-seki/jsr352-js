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
CustomElementとCustomPropertyを同時に使おうとするとエラーが起きる
CustomElementFactoryにてElement生成時に該当jobにbusinessObjectなるプロパティが設定されていないため、エラーが起きることはわかったが、なぜ設定されないのかについては未検証
