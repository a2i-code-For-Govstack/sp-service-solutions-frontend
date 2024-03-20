<template>
    <no-ssr>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            :autocomplete-items="autocompleteItems"
            @tags-changed="update"
        />
    </no-ssr>
</template>
<script>
export default {
    name: 'DomainManagementBlock',
    data() {
        return {
            tag: '',
            tags: this.$parent.domains,
            autocompleteItems: [],
            debounce: null,
        };
    },
    watch: {
        'tag': 'initItems',
    },
    methods: {
        update(newTags) {
            this.autocompleteItems = [];
            this.tags = newTags;
            let getTagsObj = ''
            let getTags = [];
            this.tags.forEach((v,i) => {
                getTagsObj = v.id;
                getTags[i] = {};
                getTags[i]['tiClasses'] = [];
                getTags[i]['text'] = v.text;
                getTags[i]['tiClasses'][0] = 'ti-valid';
            });            
            this.$parent.domains = getTags;
            this.$parent.formData.domain_id = getTagsObj;
        },
        initItems() {
            if (this.tag.length < 2) return;            
            const url = `/api/domain-list/search?term=${this.tag}&limit=6`

            clearTimeout(this.debounce);
            this.debounce = setTimeout( async () => {
                // this.$axios.get(url, this.$parent.$parent.header_config).then(response => {
                // this.autocompleteItems = response.data.map(a => {
                //     return { text: a.disease_title };
                // });
                // }).catch(() => console.warn('Oh. Something went wrong'));

                let getReponseData = await this.$http.$get(url, this.$parent.$parent.header_config);
                this.tags = [];
                // console.log('Response data', getReponseData);
                this.autocompleteItems = getReponseData.map(a => {
                    return { id: a.domain_id, text: a.sitename_bn + ' (' + a.sub_domain + ')' };
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