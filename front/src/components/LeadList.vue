<template>
    <div class="lead-list">
      <a-input-search
        placeholder="Поиск сделок"
        v-model:value="searchQuery"
        @search="fetchLeads"
        style="margin-bottom: 16px; width: 300px;"
      />
      <a-spin :spinning="loading">
        <a-table :columns="columns" :dataSource="leads" rowKey="id">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'name'">
              <a>{{ text }}</a>
            </template>
            <template v-else-if="column.key === 'price'">
              <a>{{ formatCurrency(text) }}</a>
            </template>
            <template v-else-if="column.key === 'status_id'">
              <a-tag>{{ record.status_id.name }}</a-tag>
            </template>
            <template v-else-if="column.key === 'responsible_user'">
              <a>{{ record.responsible_user.name }} ({{ record.responsible_user.email }})</a>
            </template>
            <template v-else-if="column.key === 'created_at'">
              <a>{{ new Date(text).toLocaleDateString() }}</a>
            </template>
            <template v-else-if="column.key === 'contacts'">
              <ul>
                <li v-for="contact in record.contacts" :key="contact.id">
                  {{ contact.first_name }} {{ contact.last_name }} ({{ contact.name }})
                </li>
              </ul>
            </template>
          </template>
        </a-table>
      </a-spin>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Input, Spin, Table, Tag } from 'ant-design-vue';
  import api from '../api/api';
  import { Result } from '../types/types';
  
  export default defineComponent({
    components: {
      'a-input-search': Input.Search,
      'a-spin': Spin,
      'a-table': Table,
      'a-tag': Tag
    },
    data() {
      return {
        leads: [] as Result[],
        loading: false,
        searchQuery: '',
        columns: [
          {
            title: 'Название',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Ответственный',
            dataIndex: 'responsible_user',
            key: 'responsible_user'
          },
          {
            title: 'Статус',
            dataIndex: 'status_id',
            key: 'status_id'
          },
          {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price'
          },
          {
            title: 'Дата создания',
            dataIndex: 'created_at',
            key: 'created_at'
          },
          {
            title: 'Контакты',
            dataIndex: 'contacts',
            key: 'contacts'
          }
        ]
      };
    },
    methods: {
      async fetchLeads(query = '') {
        this.loading = true;
        try {
          const response = await api.getLeads(query);
          this.leads = response.data;
        } catch (error) {
          console.error('Ошибка при загрузке сделок:', error);
        } finally {
          this.loading = false;
        }
      },
      formatCurrency(value: number): string {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
      }
    },
    watch: {
      searchQuery(newQuery) {
        this.fetchLeads(newQuery);
      }
    },
    mounted() {
      this.fetchLeads();
    }
  });
  </script>
  
  <style scoped>
  .lead-list {
    padding: 20px;
  }
  </style>
  