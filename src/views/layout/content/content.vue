
<template>
  <div class="common-layout">
        <theHeader/>
        <div class="main">
            <theSidebar />
            <theMain />
        </div>
        <div class="footer">

        </div>
  </div>
</template>

<script>
import theHeader from "../header/header.vue";
import theSidebar from "../sidebar/sidebar.vue";
import theMain from "../main/main.vue";
import {useAcademicStore} from "@/store/academicStore/index.js"
import {useLocationStore} from "@/store/locationStore/index.js"
import {usePersonnelStore} from "@/store/personnelStore/index.js"

export default {
  name: "Content",
  components: {
    theHeader,
    theSidebar,
    theMain,
  },
  mounted(){
    useAcademicStore().initAcademicDatas()
    useLocationStore().initLocationDatas()
    usePersonnelStore().initPersonnelDatas()
  }
  
};
</script>

<style scoped>
.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main{
    height: 100%;
    width: 100%;
    display: inline-flex;
    flex-direction: row;
}







</style>