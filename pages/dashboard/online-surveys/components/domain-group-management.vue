<template>
    <no-ssr>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            :autocomplete-items="autocompleteItems"
            :placeholder="set_placeholder"
            @tags-changed="update"
        />
    </no-ssr>
</template>
<script>
export default {
    name: 'DomainGroupManagementBlock',
    data() {
        return {
            tag: '',
            tags: this.$parent.domain_groups,
            autocompleteItems: [],
            debounce: null,
        };
    },
    watch: {
        'tag': 'initItems',
    },
    computed: {
        set_placeholder: function(){
            if(this.tags.length>0) return 'Add more group domain'
            else return 'Add group domain'
        }
    },
    methods: {
        update(newTags) {
            this.autocompleteItems = [];
            this.tags = newTags;
            // if(this.tags.length>1) this.tags.splice(0, 1);
            let getTagsObj = [];
            let getTags = [];
            this.tags.forEach((v,i) => {
                getTagsObj.push(v.id);
                getTags[i] = {};
                getTags[i]['tiClasses'] = [];
                getTags[i]['text'] = v.text;
                getTags[i]['tiClasses'][0] = 'ti-valid';
            });
            this.$parent.domain_groups = getTags;
            this.$parent.formData.group_ids = getTagsObj;
        },
        initItems() {
            if (this.tag.length < 2) return;            
            const url = `/api/domain-groups/search?term=${this.tag}&limit=6`

            clearTimeout(this.debounce);
            this.debounce = setTimeout( async () => {
                // this.$axios.get(url, this.$parent.$parent.header_config).then(response => {
                // this.autocompleteItems = response.data.map(a => {
                //     return { text: a.disease_title };
                // });
                // }).catch(() => console.warn('Oh. Something went wrong'));

                let getReponseData = await this.$http.$get(url, this.$parent.$parent.header_config);
                // console.log('Response data', getReponseData);
                this.autocompleteItems = getReponseData.map(a => {
                    return { id: a.id, text: a.group_title };
                });
            }, 600);
        }
    }
}
</script>
<style scoped>
    .vue-tags-input{
        max-width: 100%;
        border-radius: 5px;
    }
    .vue-tags-input >>> .ti-input{
        border-radius: 3px
    }
</style>