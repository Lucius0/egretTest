var egret_file_list = [
	"core/egret/i18n/cn.js",
	"core/egret/utils/Logger.js",
	"core/egret/utils/HashObject.js",
	"core/egret/utils/Recycler.js",
	"core/egret/utils/getTimer.js",
	"core/egret/utils/callLater.js",
	"core/egret/utils/RenderCommand.js",
	"core/egret/events/Event.js",
	"core/egret/events/HTTPStatusEvent.js",
	"core/egret/events/IOErrorEvent.js",
	"core/egret/events/TouchEvent.js",
	"core/egret/events/TimerEvent.js",
	"core/egret/events/TextEvent.js",
	"core/egret/events/ProgressEvent.js",
	"core/egret/events/EventPhase.js",
	"core/egret/events/EventDispatcher.js",
	"core/egret/context/MainContext.js",
	"core/egret/utils/Profiler.js",
	"core/egret/context/Ticker.js",
	"core/egret/layout/HorizontalAlign.js",
	"core/egret/layout/VerticalAlign.js",
	"core/egret/utils/Timer.js",
	"core/egret/utils/getQualifiedClassName.js",
	"core/egret/utils/getDefinitionByName.js",
	"core/egret/utils/setTimeout.js",
	"core/egret/utils/hasDefinition.js",
	"core/egret/utils/toColorString.js",
	"core/egret/geom/Matrix.js",
	"core/egret/geom/Point.js",
	"core/egret/geom/Rectangle.js",
	"core/egret/utils/SAXParser.js",
	"core/egret/context/StageDelegate.js",
	"core/egret/context/renderer/RenderFilter.js",
	"core/egret/utils/Injector.js",
	"core/egret/filters/Filter.js",
	"core/egret/filters/BlurFilter.js",
	"core/egret/display/BlendMode.js",
	"core/egret/display/DisplayObject.js",
	"core/egret/display/DisplayObjectContainer.js",
	"core/egret/display/StageScaleMode.js",
	"core/egret/display/Stage.js",
	"core/egret/display/ScrollView.js",
	"core/egret/display/BitmapFillMode.js",
	"core/egret/display/Bitmap.js",
	"core/egret/text/BitmapText.js",
	"core/egret/display/Graphics.js",
	"core/egret/display/Shape.js",
	"core/egret/display/Sprite.js",
	"core/egret/text/TextField.js",
	"core/egret/text/HtmlTextParser.js",
	"core/egret/text/TextFieldType.js",
	"core/egret/display/SpriteSheet.js",
	"core/egret/text/InputController.js",
	"core/egret/text/BitmapFont.js",
	"core/egret/display/MovieClip.js",
	"core/egret/display/FrameLabel.js",
	"core/egret/display/MovieClipData.js",
	"core/egret/display/MovieClipDataFactory.js",
	"core/egret/context/display/StageText.js",
	"core/egret/net/URLRequestMethod.js",
	"core/egret/net/URLLoaderDataFormat.js",
	"core/egret/net/URLVariables.js",
	"core/egret/net/URLRequestHeader.js",
	"core/egret/net/URLRequest.js",
	"core/egret/net/URLLoader.js",
	"core/egret/display/Texture.js",
	"core/egret/display/RenderTexture.js",
	"core/egret/context/renderer/RendererContext.js",
	"core/egret/context/interactive/InteractionMode.js",
	"core/egret/context/interactive/TouchContext.js",
	"core/egret/context/net/NetContext.js",
	"core/egret/context/devices/DeviceContext.js",
	"core/egret/context/external/ExternalInterface.js",
	"core/egret/context/Browser.js",
	"core/egret/context/localStorage/localStorage.js",
	"core/egret/utils/XML.js",
	"core/egret/utils/ByteArray.js",
	"core/egret/tween/Tween.js",
	"core/egret/tween/Ease.js",
	"core/egret/media/Sound.js",
	"core/jslib/NumberUtils.js",
	"core/egret/context/devices/NativeDeviceContext.js",
	"core/egret/context/renderer/NativeRendererContext.js",
	"core/egret/context/interactive/NativeTouchContext.js",
	"core/egret/context/PromiseObject.js",
	"core/egret/context/net/NativeNetContext.js",
	"core/egret/context/net/NativeResourceLoader.js",
	"core/egret/context/net/VersionController.js",
	"core/egret/context/display/NativeStageText.js",
	"core/extension/resource/events/ResourceEvent.js",
	"core/extension/resource/core/ResourceItem.js",
	"core/extension/resource/core/ResourceConfig.js",
	"core/extension/resource/core/ResourceLoader.js",
	"core/extension/resource/analyzer/AnalyzerBase.js",
	"core/extension/resource/analyzer/BinAnalyzer.js",
	"core/extension/resource/analyzer/ImageAnalyzer.js",
	"core/extension/resource/analyzer/JsonAnalyzer.js",
	"core/extension/resource/analyzer/TextAnalyzer.js",
	"core/extension/resource/analyzer/SheetAnalyzer.js",
	"core/extension/resource/analyzer/FontAnalyzer.js",
	"core/extension/resource/analyzer/SoundAnalyzer.js",
	"core/extension/resource/analyzer/XMLAnalyzer.js",
	"core/extension/resource/Resource.js",
	"core/extension/gui/collections/ArrayCollection.js",
	"core/extension/gui/managers/LayoutManager.js",
	"core/extension/gui/managers/layoutClass/DepthQueue.js",
	"core/extension/gui/core/UIGlobals.js",
	"core/extension/gui/core/UIComponent.js",
	"core/extension/gui/core/PopUpPosition.js",
	"core/extension/gui/core/ScrollPolicy.js",
	"core/extension/gui/core/ClassFactory.js",
	"core/extension/gui/core/NavigationUnit.js",
	"core/extension/gui/states/OverrideBase.js",
	"core/extension/gui/states/AddItems.js",
	"core/extension/gui/states/SetProperty.js",
	"core/extension/gui/states/SetStyle.js",
	"core/extension/gui/states/State.js",
	"core/extension/gui/utils/LayoutUtil.js",
	"core/extension/gui/utils/getScale9Grid.js",
	"core/extension/gui/utils/setProperties.js",
	"core/extension/gui/components/UIAsset.js",
	"core/extension/gui/components/SkinnableComponent.js",
	"core/extension/gui/components/supportClasses/DefaultSkinAdapter.js",
	"core/extension/gui/components/supportClasses/DefaultAssetAdapter.js",
	"core/extension/gui/components/supportClasses/Theme.js",
	"core/extension/gui/components/supportClasses/SkinBasicLayout.js",
	"core/extension/gui/components/supportClasses/ButtonBase.js",
	"core/extension/gui/components/supportClasses/ToggleButtonBase.js",
	"core/extension/gui/components/supportClasses/TextBase.js",
	"core/extension/gui/components/supportClasses/GroupBase.js",
	"core/extension/gui/components/supportClasses/ItemRenderer.js",
	"core/extension/gui/components/supportClasses/Animation.js",
	"core/extension/gui/components/supportClasses/Range.js",
	"core/extension/gui/components/supportClasses/TrackBase.js",
	"core/extension/gui/components/supportClasses/SliderBase.js",
	"core/extension/gui/components/Label.js",
	"core/extension/gui/components/Rect.js",
	"core/extension/gui/components/Button.js",
	"core/extension/gui/components/ToggleButton.js",
	"core/extension/gui/components/CheckBox.js",
	"core/extension/gui/components/RadioButtonGroup.js",
	"core/extension/gui/components/RadioButton.js",
	"core/extension/gui/components/Group.js",
	"core/extension/gui/components/ViewStack.js",
	"core/extension/gui/components/Skin.js",
	"core/extension/gui/components/ButtonSkin.js",
	"core/extension/gui/components/DataGroup.js",
	"core/extension/gui/components/SkinnableContainer.js",
	"core/extension/gui/components/SkinnableDataContainer.js",
	"core/extension/gui/components/supportClasses/ListBase.js",
	"core/extension/gui/components/Panel.js",
	"core/extension/gui/components/TitleWindow.js",
	"core/extension/gui/components/Alert.js",
	"core/extension/gui/components/ProgressBar.js",
	"core/extension/gui/components/ProgressBarDirection.js",
	"core/extension/gui/components/HSlider.js",
	"core/extension/gui/components/HScrollBar.js",
	"core/extension/gui/components/VSlider.js",
	"core/extension/gui/components/VScrollBar.js",
	"core/extension/gui/components/List.js",
	"core/extension/gui/components/PopUpAnchor.js",
	"core/extension/gui/components/TabBarButton.js",
	"core/extension/gui/components/TabBar.js",
	"core/extension/gui/components/Scroller.js",
	"core/extension/gui/components/EditableText.js",
	"core/extension/gui/events/UIEvent.js",
	"core/extension/gui/events/PropertyChangeEvent.js",
	"core/extension/gui/events/PropertyChangeEventKind.js",
	"core/extension/gui/events/MoveEvent.js",
	"core/extension/gui/events/ResizeEvent.js",
	"core/extension/gui/events/SkinPartEvent.js",
	"core/extension/gui/events/CloseEvent.js",
	"core/extension/gui/events/CollectionEvent.js",
	"core/extension/gui/events/CollectionEventKind.js",
	"core/extension/gui/events/ElementExistenceEvent.js",
	"core/extension/gui/events/IndexChangeEvent.js",
	"core/extension/gui/events/ListEvent.js",
	"core/extension/gui/events/PopUpEvent.js",
	"core/extension/gui/events/RendererExistenceEvent.js",
	"core/extension/gui/events/StateChangeEvent.js",
	"core/extension/gui/events/TrackBaseEvent.js",
	"core/extension/gui/layouts/supportClasses/LayoutBase.js",
	"core/extension/gui/layouts/BasicLayout.js",
	"core/extension/gui/layouts/VerticalLayout.js",
	"core/extension/gui/layouts/HorizontalLayout.js",
	"core/extension/gui/core/UILayer.js",
	"core/extension/gui/core/UIStage.js",
	"core/extension/gui/managers/impl/PopUpManagerImpl.js",
	"core/extension/gui/managers/PopUpManager.js",
	"core/extension/socket/HTML5WebSocket.js",
	"core/extension/socket/NativeSocket.js",
	"core/extension/socket/WebSocket.js",
	"particle/Particle.js",
	"particle/ParticleSystem.js",
	"particle/GravityParticle.js",
	"particle/GravityParticleSystem.js",
	"protobuf/ByteBufferAB.min.js",
	"protobuf/Long.min.js",
	"protobuf/ProtoBuf.min.js"
];