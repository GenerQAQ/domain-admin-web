//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'

const WHITE_LIST = ['/login']

export function routerPermission(router) {
  router.beforeEach(async (to, from, next) => {
    // 显示
    NProgress.start()

    let token = getToken()
    const store = useUserStore()

    if (token && !store.hasUserInfo) {
      await store.updateUserInfo()
    }

    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      if (store.hasUserInfo) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  })

  router.afterEach(() => {
    // 关闭
    NProgress.done()
  })
}
