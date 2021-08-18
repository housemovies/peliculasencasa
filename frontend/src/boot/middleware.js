import { isUndefined, head, get } from 'lodash'

const globalMiddleware = ['check-auth']

const routeMiddleware = resolveMiddleware(require.context('../middleware', false, /.*\.js$/))

function resolveMiddleware (requireContext) {
  return requireContext
    .keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce(
      (guards, [name, guard]) => ({ ...guards, [name]: guard.default }),
      {}
    )
}

export default async ({ router, app, store }) => {
  router.afterEach(async (to, from, next) => {
    await router.app.$nextTick()
    router.app.$children[0].$loading.stop()
  })

  router.beforeEach(async (to, from, next) => {
    let components = []

    try {
      // Get the matched components and resolve them.
      components = await resolveComponents(
        router.getMatchedComponents({ ...to })
      )
    } catch (error) {
      if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
        window.location.reload(true)
        return
      }
    }

    if (components.length === 0) {
      return next()
    }

    // Start the loading bar.
    if (components[components.length - 1].loading !== false) {
      router.app.$nextTick(() => router.app.$children[0].$loading.start())
    }

    // Get the middleware for all the matched components.
    const middleware = getMiddleware(components)

    // Call each middleware.
    callMiddleware(store, router, middleware, to, from, (...args) => {
      // Set the application layout only if "next()" was called with no args.
      if (args.length === 0) {
        if (isUndefined(head(components).default)) {
          router.app.$children[0].setLayout(head(components).layout || '')
        } else {
          router.app.$children[0].setLayout(head(components).default.layout || '')
        }
      }

      next(...args)
    })
  })
}

function callMiddleware (store, router, middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      router.app.$children[0].$loading.stop()
      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next, store)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next, store)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

function resolveComponents (components) {
  return Promise.all(
    components.map(component => {
      return typeof component === 'function' ? component() : component
    })
  )
}

function getMiddleware (components) {
  const middleware = [...globalMiddleware]
  components.filter(c => c.middleware || get(c, 'default.middleware', false))
    .forEach(component => {
      const middlewareComponent = component.middleware || component.default.middleware
      if (Array.isArray(middlewareComponent)) {
        middleware.push(...middlewareComponent)
      } else {
        middleware.push(middlewareComponent)
      }
    })

  return middleware
}
