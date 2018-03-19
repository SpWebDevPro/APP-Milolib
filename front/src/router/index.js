/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import auth from "@/modules/auth/auth";
import dashboard from "@/modules/dashboard/dashboard";
import listUser from "@/modules/listUser/listUser";
import profileUser from "@/modules/profileUser/profileUser";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "auth",
			component: auth
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: dashboard
		},
		{
			path: "/listUser",
			name: "listUser",
			component: listUser
		},
		{
			path: "/profileUser",
			name: "profileUser",
			component: profileUser
		}
	]
});