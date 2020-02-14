<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item 
        v-for="route in routes" 
        :key="route.path" 
        :item="route" 
        :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'roles'
    ]),
    routes() {
      let newRoutes = []
      console.log(this.$router.options.routes[3].meta.roles)
      for(let i in this.$router.options.routes) {
        try {
          let pageRoles = this.$router.options.routes[i].meta.roles
          if(this.checkRoles(pageRoles, this.roles)) {
            newRoutes.push(this.$router.options.routes[i])
          }
        } catch {
          newRoutes.push(this.$router.options.routes[i])
        }
        
      }
      // return this.$router.options.routes
      return newRoutes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  mounted() {
    // console.log('sidebar $route.meta.title', this.$route.meta.title)
    // console.log('sidebar $route.meta.roles', this.$route.meta.roles)
    // console.log(this.roles)
    // console.log('check rules', this.checkRoles)
  },
  methods: {
    // 我自己寫的 確認 roles 用的
    checkRoles(pageRoles, roles) {
      let result = false
      for(let i in pageRoles) {
        for(let j in roles) {
          if(pageRoles[i] == roles[j]) {
            result = true
            break
          }
        }
      }
      return result
    }
  }
}
</script>
