<template>
    <div class="empty" v-if="isEmptyValue(publishedItems)">
        You dont have any messages to display
    </div>
    <table v-else class="table">
        <thead class="table-head">
            <tr class="table-head__row">
                <th class="table-head__item" v-for="(header, index) in tableHeader" :key="index">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody class="table-body">
            <tr class="table-body__row" v-for="(item, index) in Object.values(publishedItems)" :key="index">
                <td class="table-body__item">{{ index }} </td>
                <td class="table-body__item">{{ item.message }}</td>
                <td class="table-body__item">{{ item.topic }}</td>
                <td class="table-body__item">
                    {{ item.qos }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { tableHeader } from '@/static/store'
import type { PropType } from 'vue'
import { onMounted } from 'vue'
import { isEmptyValue } from '~/helpers'
import type { IPublishedItems } from "~/static/index.model"
export default {
    components: {
    },
    props: {
        publishedItems: {
            type: Object as PropType<IPublishedItems>,
            default: () => { }
        }
    },
    setup(props) {

        onMounted(() => {
            console.log(props)
        })

        return {
            isEmptyValue,
            tableHeader,
        }

    }
}

</script>
<style lang="scss">
.table {
    margin-top: 3rem;
    overflow: auto;
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    border-radius: 1rem;
    box-shadow: $primary-box-shadow;
    border: 1px solid $primary-border-color;

    @include screen(custom, max, 576) {
        width: 100%;
    }

    &-head {
        border-width: 0px 1px 1px 1px;
        border-style: solid;
        border-color: #c4c4c4;

        &__item {
            padding: 1.6rem 0 1.7rem 2rem;
            text-align: left;
            font-size: 1.6rem;
            font-weight: 500;

            &:first-of-type {
                padding-left: 1.8rem;
            }
        }
    }

    &-body {
        &__row {
            &:nth-child(even) {
                border-width: 1px 0px;
                border-style: solid;
                border-color: $input-background-color;
                background: rgba($primary-border-color, 0.5);
            }
        }

        &__item {
            padding: 1.6rem 0 1.3rem 2rem;
            font-weight: 600;

            &:first-of-type {
                padding-left: 1.7rem;
            }
        }
    }
}

.empty {
    display: flex;
    justify-content: center;
    padding: 3rem 0;
}
</style>