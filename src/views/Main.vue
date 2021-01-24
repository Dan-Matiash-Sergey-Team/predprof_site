<template>
    <div>
        <BaseInput type="number" v-model="weight" :value="weight"/>
        <BaseButton @click="saveWeight">Сохранить</BaseButton>
        <br>
        <div v-for="(record,i) in allRecords" :key="i">
            <p>{{record.date}}: {{record.value}}</p>
        </div>
    </div>
</template>

<script>
    import BaseInput from "../components/BaseInput";
    import BaseButton from "../components/BaseButton";

    export default {
        name: "Main",
        components: {BaseButton, BaseInput},
        data() {
            return {
                weight: 0,
                allRecords: this.$store.getters.records
            }
        },
        methods: {
            saveWeight: async function () {
                const resp = await fetch('http://195.133.147.101:228/records/', {
                    method: "POST",
                    body: JSON.stringify({
                        record: {
                            value: this.weight
                        }
                    }),
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': 'Bearer ' + this.$store.getters.access
                    }
                })
                if (resp.status === 403) {
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
                    this.saveWeight()
                } else if (resp.status === 200) {
                    this.$store.commit('addRecord', {value: this.weight, date: String(new Date())})
                }
            }
        },
        async mounted() {
            if (new Date(this.allRecords[this.allRecords.length-1].date).getDate() === new Date().getDate()) {
                this.weight = this.allRecords[this.allRecords.length-1].value
            }
        }
    }
</script>

<style scoped>

</style>
