import { ref } from 'vue'
import { defineStore } from 'pinia'

import ConfirmVue from '../../components/admin-panel-components/modals/confirm.vue'
import ModalVue from '../../components/admin-panel-components/modals/modal.vue'
import AlertVue from '../../components/admin-panel-components/modals/alert.vue'

export const useGlobalModalStore = defineStore('global_modal', () => {
    let _current_modal: any = null
    const _is_show = ref(false)
    const _is_loading = ref(false)

    const _is_modal_animation_enabled = ref(true)
    const _is_overlay_enabled = ref(true)
    const _is_overlay_animation_enabled = ref(true)

    const _title = ref('default dialog title')
    const _content = ref('default dialog content')
    const _confirm_btn_text = ref('確認')
    const _cancel_btn_text = ref('取消')

    let _confirm_callback_fn: any = function () {}
    let _confirm_callback_params: any = null
    const _is_confirm_callback_fn_async = ref(false)

    const modalArr = {
        ConfirmVue,
        ModalVue,
        AlertVue,
    }

    function use_alert() {
        _current_modal = modalArr.AlertVue
    }
    function use_confirm() {
        _current_modal = modalArr.ConfirmVue
    }
    function use_custom_component(comp: any) {
        _current_modal = comp
    }
    function get_current_modal() {
        return _current_modal
    }

    function set_confirm_callback_fn(fn: any, ...params: any) {
        _confirm_callback_fn = fn
        _confirm_callback_params = [...params]
    }
    async function exec_async_confirm_callback_fn() {
        await _confirm_callback_fn(..._confirm_callback_params)
    }
    function exec_confirm_callback_fn() {
        _confirm_callback_fn(..._confirm_callback_params)
    }
    function set_confirm_callback_type_async() {
        _is_confirm_callback_fn_async.value = true
    }
    function set_confirm_callback_type_sync() {
        _is_confirm_callback_fn_async.value = false
    }
    function is_confirm_callback_type_async() {
        return _is_confirm_callback_fn_async.value
    }

    function is_loading() {
        return _is_loading.value
    }
    function start_loading() {
        _is_loading.value = true
    }
    function stop_loading() {
        _is_loading.value = false
    }

    function show() {
        _is_show.value = true
    }
    function hide() {
        _is_show.value = false
    }
    function toggle() {
        _is_show.value = !_is_show.value
    }
    function is_show() {
        return _is_show.value
    }

    function enable_overlay() {
        _is_overlay_enabled.value = true
    }
    function disable_overlay() {
        _is_overlay_enabled.value = false
    }
    function is_overlay_enabled() {
        return _is_overlay_enabled.value
    }

    function enable_overlay_animation() {
        _is_overlay_animation_enabled.value = true
    }
    function disable_overlay_animation() {
        _is_overlay_animation_enabled.value = false
    }
    function is_overlay_animation_enabled() {
        return _is_overlay_animation_enabled.value
    }

    function enable_modal_animation() {
        _is_modal_animation_enabled.value = true
    }
    function disable_modal_animation() {
        _is_modal_animation_enabled.value = false
    }
    function is_modal_animation_enabled() {
        return _is_modal_animation_enabled.value
    }

    function get_title() {
        return _title.value
    }
    function set_title(title: string) {
        _title.value = title
    }

    function get_content() {
        return _content.value
    }
    function set_content(content: string) {
        _content.value = content
    }

    function get_confirm_btn_text() {
        return _confirm_btn_text.value
    }
    function set_confirm_btn_text(text: string) {
        _confirm_btn_text.value = text
    }

    function get_cancel_btn_text() {
        return _cancel_btn_text.value
    }
    function set_cancel_btn_text(text: string) {
        _cancel_btn_text.value = text
    }

    return {
        show,
        hide,
        toggle,
        is_show,

        use_alert,
        use_confirm,
        use_custom_component,
        get_current_modal,

        enable_overlay,
        disable_overlay,
        is_overlay_enabled,
        enable_overlay_animation,
        disable_overlay_animation,
        is_overlay_animation_enabled,
        enable_modal_animation,
        disable_modal_animation,
        is_modal_animation_enabled,

        get_cancel_btn_text,
        set_cancel_btn_text,
        get_confirm_btn_text,
        set_confirm_btn_text,

        get_content,
        set_content,
        get_title,
        set_title,

        set_confirm_callback_fn,
        exec_confirm_callback_fn,
        exec_async_confirm_callback_fn,
        set_confirm_callback_type_async,
        set_confirm_callback_type_sync,
        is_confirm_callback_type_async,

        is_loading,
        start_loading,
        stop_loading,
    }
})
