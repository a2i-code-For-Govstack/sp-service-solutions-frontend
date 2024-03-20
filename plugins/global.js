import Vue from 'vue';
import Editor from '@tinymce/tinymce-vue'
import FormBlockLoader from '~/components/loader/FormBlockLoader';
import RainbowLoader from '~/components/loader/RainbowLoader';
import TableContentLoader from '~/components/loader/TableContentLoader'
import SpinkitLoader from '~/components/loader/SpinkitLoader'
import SpinkitBounceLoader from '~/components/loader/SpinkitBounceLoader'
import SpinkitDoubleBounceLoader from '~/components/loader/SpinkitDoubleBounceLoader'
import Pagination from '~/components/Pagination';

Vue.component('TinyMce', Editor);
Vue.component('FormBlockLoader', FormBlockLoader);
Vue.component('RainbowLoader', RainbowLoader);
Vue.component('TableContentLoader', TableContentLoader);
Vue.component('SpinkitLoader', SpinkitLoader);
Vue.component('SpinkitBounceLoader', SpinkitBounceLoader);
Vue.component('SpinkitDoubleBounceLoader', SpinkitDoubleBounceLoader);
Vue.component('Pagination', Pagination);