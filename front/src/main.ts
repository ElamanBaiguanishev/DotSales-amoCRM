import { createApp } from 'vue';
import App from './App.vue';
import { Button, Table, Tag, Spin } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(Button);
app.use(Table);
app.use(Tag);
app.use(Spin);

app.mount('#app');
