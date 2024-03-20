<template>
    <div class="container clearfix">
      <div class="right_section float-left">
        <VideoContentBlock />
        <ContentBlock />
        <CourseContentBlock/>
        <konnectContentBlock />
        <LinkBlock />
      </div>
    </div>
</template>
<script>
import VideoContentBlock from './VideoContentBlock'
import ContentBlock from './ContentBlock'
import CourseContentBlock from './CourseContentBlock'
import konnectContentBlock from './konnectContentBlock'
// import LatestUpdateBlock from './LatestUpdateBlock'
// import LiveClassRouteBlock from './LiveClassRoute'
import LinkBlock from './LinkBlock'
export default {
    name:"BodyContent",
    components: {
      VideoContentBlock,
      ContentBlock,
      CourseContentBlock,
      konnectContentBlock,      
      // LatestUpdateBlock,
      // LiveClassRouteBlock,
      LinkBlock
    }
}
</script>
<style scoped>

  .right_section{
    width: 100%;
    margin-left: -1px;
  }
</style>