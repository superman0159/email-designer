<template>
	<div class="tab-controls">
		<span 
			v-on:dragstart="moveStart"
			v-on:dragend="moveEnd"
			data-method="move" draggable="true">Move</span>
		<span
			v-on:click="editBlock"
		>Edit</span>
		<span
			v-on:click="deleteBlock"
		>Delete</span>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods :
		{
			moveStart : function(evt) {
				this.$root.$data.dragged = evt.target.parentNode.parentNode;

				let dt = evt.dataTransfer;

				if (dt.setDragImage && dt.setData)
				{
					// removes ghost image on cursor (Firefox/Chrome)
					dt.setDragImage(new Image(), 0, 0);

					// initiates drag events (Firefox)
					dt.setData('key', '');
				}

				// reveal dropzones
				document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
					dropzone.classList.add('reveal');
				});
			},
			moveEnd : function(evt)
			{
				// hide dropzones
				document.querySelectorAll('*[data-state="drop"],*[data-state="append"]').forEach(function(dropzone) {
					dropzone.classList.remove('reveal');
				});
			},
			editBlock : function(evt)
			{
				// switch to settings tab
				this.$root.$children[0].$children[1].$data.currentTab = 'settings';

				let content = this.$parent.$data.components[this.$data.editId].content;

				// assign component content property
				this.$root.$data.editorContent = content;
			},
			deleteBlock : function(evt)
			{
				let vm = this;

				// grab currently evaluated table
				let id = evt.target.parentNode.parentNode.dataset.id;

				// remove vnode from virtual dom
				vm.$parent.$data.components.splice(id, 1);

				// re-index vnode array
				vm.$parent.reIndex();
			}
		}
	}
</script>

<style lang="scss">
.tab-controls
{
	position: absolute;
	top: 0;
	left: 0;
	display: none;
	width: 100%;

	span
	{
		padding: 5px;
		margin-right: 5px;
		background: rgba(0,0,0,.5);

		&:hover {
			cursor: pointer;
		}
	}
}
</style>