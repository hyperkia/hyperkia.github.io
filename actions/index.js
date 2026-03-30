import * as kiaApp from './kia-app/index.js';
import kiaLeftHeader from './kia-workspace/kia-left-sidebar/kia-left-header/index.js';
import * as kiaLayers from './kia-workspace/kia-left-sidebar/kia-layers/index.js';
import * as kiaPages from './kia-workspace/kia-left-sidebar/kia-pages/index.js';
import * as kiaCssTag from './kia-workspace/kia-right-sidebar/kia-right-sidebar-body/kia-design-module/kia-css-tag/index.js';
import * as kiaCssFilter from './kia-workspace/kia-right-sidebar/kia-right-sidebar-body/kia-design-module/kia-css-filter/index.js';
import * as kiaCssEffect from './kia-workspace/kia-right-sidebar/kia-right-sidebar-body/kia-design-module/kia-css-effect/index.js';
import * as kiaCanvas from './kia-workspace/kia-canvas/index.js';
import * as kiaCanvasTools from './kia-workspace/kia-canvas-tools/index.js';
import * as kiaModals from './kia-overlays/kia-modals/index.js';
import kiaFontLibraryModal from './kia-overlays/kia-modals/kia-font-library-modal/index.js';
import kiaFileImportModal from './kia-overlays/kia-modals/kia-file-import-modal/index.js';
import kiaMissingFontsModal from './kia-overlays/kia-modals/kia-missing-fonts-modal/index.js';
import kiaAssetsManagerModal from './kia-overlays/kia-modals/kia-assets-manager-modal/index.js';
import * as kiaColorPickerPopover from './kia-overlays/kia-popovers/kia-color-picker-popover/index.js';
import * as share from './share/index.js';
import runtime from './runtime/index.js';

KIA.actions = {
	kiaApp,
	kiaLeftHeader,
	kiaPages,
	kiaLayers,
	kiaCssTag,
	kiaCssFilter,
	kiaCssEffect,
	kiaCanvas,
	kiaCanvasTools,
	kiaModals,
	kiaFontLibraryModal,
	kiaFileImportModal,
	kiaColorPickerPopover,
	share,
	runtime,
	kiaMissingFontsModal,
	kiaAssetsManagerModal,
}

