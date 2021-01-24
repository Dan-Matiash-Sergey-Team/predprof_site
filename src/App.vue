<template>
    <router-view/>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                userData: {}
            }
        },
        async mounted() {
            if (!this.$store.getters.logged) {
                await this.$router.push('/login')
            } else {
                const resp = await fetch('http://195.133.147.101:228/records/', {
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': 'Bearer ' + this.$store.getters.access
                    }
                })
                if (resp.status === 401) {
                    const resp = await fetch('http://195.133.147.101:228/token/refresh', {
                        method: "POST",
                        body: JSON.stringify({
                            refresh: this.$store.getters.refresh
                        }),
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })
                    if (resp.status === 403) {
                        await this.$router.push('/login')
                    }
                    const a = await resp.json()
                    this.$store.commit('newAccess', {access: a.access})
                    await this.$router.push('/')
                } else if (resp.status === 200) {
                    const a = await resp.json()
                    console.log(a)
                    this.$store.commit('setRecords', a.records)
                    await this.$router.push('/main')
                }

            }
        }
    }
</script>

<style>
</style>
