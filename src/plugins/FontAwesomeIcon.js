import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faMinus, faStar, farStar);

export default FontAwesomeIcon;
