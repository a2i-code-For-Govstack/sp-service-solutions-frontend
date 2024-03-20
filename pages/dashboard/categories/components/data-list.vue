<template>
    <tr>
        <td align="center">{{ sl }}</td>
        <td>{{ child_sign + ' ' }}{{ item.category_name }}</td>
        <td>{{ item.slug }}</td>
        <td>
            <span v-if="item.icon" class="icon">
                <img :src="item.icon" />                
            </span>
        </td>
        <td align="center">
            <span class="status">
                <i :class="['far','fa-check-circle',{active:item.status}]"></i>
            </span>
        </td>
        <td align="center">
            <div class="action_block">
                <span @click="$parent.edit_item(item.id)"><i class="fa fa-edit"></i></span>
                <span @click="$parent.del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'DataListBlock',
    props: ['sl','child_sign','item']
}
</script>
<style scoped>
    .icon{
        display: inline-block;
        width: 52px; height: 52px; padding: 5px;
        line-height: 40px; text-align: center;
        border: 1px solid #ddd; background-color: #fff;
        border-radius: 5px; overflow: hidden;
    }
    .icon > img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .icon > i{
        font-size: 26px; line-height: 40px; color: #ccc
    }
    .status > i{
        font-size: 18px;
        color: #ccc
    }
    .status > i.active{
        color: #5dad5d
    }
</style>