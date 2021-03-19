<template>
    <router-view/>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
            }
        },
        methods: {
            init: async function(){
                console.log(this.$store.getters.access)
                if (!this.$store.getters.access && localStorage.access) {
                    this.$store.commit('newAccess', localStorage.access)
                }
                if (!this.$store.getters.refresh && localStorage.refresh) {
                    this.$store.commit('newRefresh', localStorage.refresh)
                }
                if (!this.$store.getters.access) {
                    await this.$router.push('/login')
                } else {
                    console.log(this.$store.getters.access)
                    localStorage.access = this.$store.getters.access
                    localStorage.refresh = this.$store.getters.refresh
                    const resp = await fetch('http://195.133.147.101:228/records/', {
                        method: "GET",
                        headers: {
                            "Content-Type": 'application/json',
                            'Authorization': 'Bearer ' + this.$store.getters.access
                        }
                    })
                    if (resp.status === 401) {
                        const resp = await fetch('http://195.133.147.101:228/token/refresh/', {
                            method: "POST",
                            body: JSON.stringify({
                                refresh: this.$store.getters.refresh
                            }),
                            headers: {
                                "Content-Type": 'application/json'
                            }
                        })
                        if (resp.status === 400 || resp.status === 401) {
                            await this.$router.push('/login')
                        } else {
                            const a = await resp.json()
                            this.$store.commit('newAccess', a.access)
                            this.init()
                        }
                    } else if (resp.status === 200) {
                        const a = await resp.json()
                        this.$store.commit('setRecords', a.records)
                        await this.$router.push('/main')
                    }
                }
            }
        },
        async mounted() {
            await this.init()
        }
    }
</script>

<style>
</style>
