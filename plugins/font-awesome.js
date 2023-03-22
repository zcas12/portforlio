import Vue from 'vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faFaceGrinHearts,faFaceLaughBeam,faFaceFrown,faFaceSmile ,faFaceAngry ,faFaceMeh} from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faFaceGrinHearts,faFaceLaughBeam,faFaceFrown, faFaceSmile, faFaceAngry,faFaceMeh,faEyeSlash)
/* add font awesome icon component */
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

