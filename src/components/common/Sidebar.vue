<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#E9F3F5"
            text-color="#87898B"
            active-text-color="#222"
            unique-opened
            router
             @select="handleSelect"
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '首页'
                },
               
                {
                    icon: 'el-icon-files',
                    index: '3',
                    title: '注册',
                    subs: [
                        {
                            index: 'register',
                            title: '注册'
                        },
                       
                        {
                            index: 'release',
                            title: '发布文章'
                        },
                        {
                            index: 'register-release',
                            title: '注册并发布文章'
                        }
                    ]
                },
                {
                    icon: 'el-icon-setting',
                    index: '4',
                    title: '设置',
                    subs: [
                        {
                            index: 'setting',
                            title: '配置信息'
                        },
                       
                        {
                            index: 'setting-email',
                            title: '设置邮箱'
                        }
                    ]
                },
                {
                    icon: 'el-icon-setting',
                    index: 'task',
                    title: '任务',
                  
                }
                
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
    handleSelect(key, keyPath) {
    //   console.log(key)
      this.$router.push("/"+keyPath)
    }
  }
    
};
</script>

<style scoped>
.sidebar {
   
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    z-index: 10;
    /* background-color: #E9F3F5 !important */
    /* width: 255px; */
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.el-submenu .el-menu-item {
        padding: 0 0px 0 54px!important;
}
</style>
