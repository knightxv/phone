import Vue from 'vue';
import './mint-ui.less';
/** require ensure */
// import Button from 'mint-ui/lib/button';
// import Field from 'mint-ui/lib/field';
import {
  Button, Field, Header, Cell, Tabbar, TabItem,
  TabContainer, TabContainerItem, DatetimePicker,
  Loadmore, Navbar,
} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Navbar.name, Navbar);
