// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
	// The relative path of the components folder
	'./components/email-components',
	// Whether or not to look in subfolders
	true,
	// The regular expression used to match base component filenames
	/\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName)

	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Strip the leading `./` and extension from the filename
			fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
		)
	)

	// Register component globally
	Vue.component(
		componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: 
  { 
  	App
  },
  template: '<App/>'
})
