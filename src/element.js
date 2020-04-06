import Vue from 'vue';
import './element-variables.scss'
import {
    /* 
    
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    
    
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    
    ButtonGroup,
    
    DatePicker,
    TimeSelect,
    TimePicker,
    
    
    
    
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    
    Upload,
    
    Spinner,
    Badge,
    
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
     */
    Button,
    Notification,
    MessageBox,
    Loading,
    Message,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
    Popover,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Pagination,
    Table,
    TableColumn,
    Row,
    Col,
    Dialog,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Form,
    FormItem,
    Progress,
    Card,
} from 'element-ui';

console.log('element加载');
/* 

Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);



Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);

Vue.use(ButtonGroup);

Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);




Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);

Vue.use(Upload);

Vue.use(Spinner);
Vue.use(Badge);

Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel); */

Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Progress);
Vue.use(Card);

function MessApi() { }
MessApi.install = () => {
    Vue._message = Message;

    Object.defineProperties(Vue.prototype, {
        $loading: {
            get() {
                return Loading.service;
            }
        },
        $msgbox: {
            get() {
                return MessageBox;
            }
        },
        $alert: {
            get() {
                return MessageBox.alert;
            }
        },
        $confirm: {
            get() {
                return MessageBox.confirm;
            }
        },
        $prompt: {
            get() {
                return MessageBox.prompt;
            }
        },
        $notify: {
            get() {
                return Notification;
            }
        },
        $message: {
            get() {
                return Message;
            }
        },
    })
}
Vue.use(MessApi);

