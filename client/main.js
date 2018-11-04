import 'babel-polyfill';
import 'dom-shims/shim/Element.classList';
import 'dom-shims/shim/Element.mutation';
import 'event-source-polyfill';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'vue-directive-tooltip/css/index.css';

import { getComponentName, getToolbarName } from './components/editor/teaching-elements/toolkit/utils';
import AccordionToolbar from './components/editor/toolbar/AccordionToolbar';
import AudioToolbar from 'tce/tce-audio/edit/Toolbar';
import BrightcoveVideoToolbar from './components/editor/toolbar/BrightcoveVideoToolbar';
import CarouselToolbar from './components/editor/toolbar/CarouselToolbar';
import DefaultToolbar from './components/editor/toolbar/DefaultToolbar';
import EmbedToolbar from 'tce/tce-embed/edit/Toolbar';
import ImageToolbar from 'tce/tce-image/edit/Toolbar';
import ModalToolbar from './components/editor/toolbar/ModalToolbar';
import PdfToolbar from 'tce/tce-pdf/edit/Toolbar';
import QuillToolbar from 'tce/tce-html/edit/Toolbar';
import TableToolbar from './components/editor/toolbar/TableToolbar';
import Timeago from 'vue-timeago';
import TeAccordion from './components/editor/teaching-elements/Accordion/Accordion';
import TeAssessment from './components/editor/teaching-elements/Assessment';
import TeAudio from 'tce/tce-audio/edit';
import TeBreak from './components/editor/teaching-elements/PageBreak';
import TeBrightcoveVideo from './components/editor/teaching-elements/BrightcoveVideo';
import TeCarousel from './components/editor/teaching-elements/Carousel/Carousel';
import TeEmbed from 'tce/tce-embed/edit';
import TeHtml from 'tce/tce-html/edit';
import TeImage from 'tce/tce-image/edit';
import TeModal from './components/editor/teaching-elements/Modal';
import TePdf from 'tce/tce-pdf/edit';
import TeTable from './components/editor/teaching-elements/Table';
import TeTableCell from './components/editor/teaching-elements/Table/TableCell';
import TeVideo from 'tce/tce-video/edit';
import Tooltip from 'vue-directive-tooltip';
import VeeValidate from './utils/validation';
import VideoToolbar from 'tce/tce-video/edit/Toolbar';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import store from './store';
import router from './router';
import App from './App';

// Scan modules and build dynamically
const contentElements = [
  { element: TeBreak, toolbar: DefaultToolbar, type: 'BREAK' },
  { element: TeBrightcoveVideo, toolbar: BrightcoveVideoToolbar, type: 'BRIGHTCOVE_VIDEO' },
  { element: TeEmbed, toolbar: EmbedToolbar, type: 'EMBED' },
  { element: TeHtml, toolbar: QuillToolbar, type: 'HTML' },
  { element: TeImage, toolbar: ImageToolbar, type: 'IMAGE' },
  { element: TeAssessment, toolbar: DefaultToolbar, type: 'ASSESSMENT' },
  { element: TeVideo, toolbar: VideoToolbar, type: 'VIDEO' },
  { element: TeAccordion, toolbar: AccordionToolbar, type: 'ACCORDION' },
  { element: TeCarousel, toolbar: CarouselToolbar, type: 'CAROUSEL' },
  { element: TeModal, toolbar: ModalToolbar, type: 'MODAL' },
  { element: TePdf, toolbar: PdfToolbar, type: 'PDF' },
  { element: TeAudio, toolbar: AudioToolbar, type: 'AUDIO' },
  { element: TeTable, toolbar: TableToolbar, type: 'TABLE' },
  { element: TeTableCell, toolbar: QuillToolbar, type: 'TABLE-CELL' }
];

contentElements.forEach(it => {
  Vue.component(getComponentName(it.type), it.element);
  Vue.component(getToolbarName(it.type), it.toolbar);
});

Vue.use(Tooltip, { delay: 50 });
Vue.use(VeeValidate, {
  delay: 700,
  fieldsBagName: 'vFields',
  errorBagName: 'vErrors',
  inject: false
});

Vue.use(Timeago, {
  locale: 'en-US',
  locales: {
    'en-US': require('assets/locales/timeago-en-US-short.json')
  }
});

sync(store, router);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
