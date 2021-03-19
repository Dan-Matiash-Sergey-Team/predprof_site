<template>
    <div class="col-md" id="app">

        <br>
        <!--        <div :key="i" v-for="(record,i) in allRecords">-->
        <!--            <p>{{new Date(record.date).toLocaleString("ru", {-->
        <!--                year: 'numeric',-->
        <!--                month: 'numeric',-->
        <!--                day: 'numeric',-->
        <!--                timezone: 'UTC',-->
        <!--                hour: 'numeric',-->
        <!--                minute: 'numeric',-->
        <!--                second: 'numeric'-->
        <!--                })}}: {{record.value}}</p>-->
        <!--        </div>-->
        <!--        <br>-->
        <GChart
                :data="chartData"
                :options="options"
                :settings="{'packages':['corechart'],language: 'ru'}"
                type="LineChart"
                v-if="allRecords.length>0"/>
        <br>
        <labelAlpha>
            <label>Выберите временной период</label>
        </labelAlpha>
        <graphicsAlpha>
            <el-date-picker
                    :picker-options="pickerOptions"
                    align="right"
                    end-placeholder="End date"
                    range-separator="To"
                    start-placeholder="Start date"
                    type="datetimerange"
                    v-model="date">
            </el-date-picker>
        </graphicsAlpha>
        <inputAlpha>
            <BaseInput :value="weight" type="number" v-model="weight"/>
        </inputAlpha>
        <butAlpha>
            <BaseButton @click="saveWeight" v-if="!todayRecord">Сохранить</BaseButton>
            <BaseButton @click="editWeight" v-else>Изменить</BaseButton>
        </butAlpha>
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
                date: [],
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
                    if (resp.status === 403 || resp.status === 401 || resp.status === 400) {
                        await this.$router.push('/login')
                    }
                    const a = await resp.json()
                    this.$store.commit('newAccess', {access: a.access})
                    await this.saveWeight()
                } else if (resp.status === 200) {
                    this.$store.commit('addRecord', {value: this.weight, date: String(new Date())})
                }
            },
            editWeight: async function () {
                const resp = await fetch('http://195.133.147.101:228/records/', {
                    method: "PUT",
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
                    if (resp.status === 403 || resp.status === 401 || resp.status === 400) {
                        await this.$router.push('/login')
                    }
                    const a = await resp.json()
                    this.$store.commit('newAccess', {access: a.access})
                    this.saveWeight()
                } else if (resp.status === 200) {
                    this.$store.commit('editRecord', {value: this.weight, date: String(new Date())})
                }
            }
        },
        computed: {
            options: function () {
                return {
                    title: 'Вес', 'explorer.maxZoomIn': 0.5,
                    hAxis: {
                        format: 'd/MM/yyyy',
                        gridlines: {
                            count: (new Date(this.allRecords[this.allRecords.length-1]).getTime() - new Date(this.allRecords[0]).getTime())/(1000 * 3600 * 24* 7)
                        }
                    },
                    pointSize: 10,

                }
            },
            todayRecord: function () {
                if (this.allRecords.length === 0) return false
                return new Date(this.allRecords[this.allRecords.length - 1].date).getDate() === new Date().getDate()
            },
            chartData: function () {
                let a = [['Дата', 'Вес']]
                if (this.allRecords.length > 0) {
                    this.allRecords.forEach((el) => {
                        if (this.date.length > 0) {
                            if (new Date(this.date[0]) < new Date(el.date) && new Date(el.date) < new Date(this.date[1])) {
                                a.push([new Date(el.date), parseInt(el.value)])
                            }
                        } else {
                            a.push([new Date(el.date), parseInt(el.value)])
                        }
                    })
                }
                return a
            },
            allRecords: function () {
                return this.$store.getters.records
            }
        },
        async mounted() {
            if (this.todayRecord) {
                this.weight = this.allRecords[this.allRecords.length - 1].value
            }
            const resp = await fetch('http://195.133.147.101:228/records/', {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + this.$store.getters.access
                }
            })
            console.log(resp)
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
                console.log(resp)
                if (resp.status === 403 || resp.status === 401 || resp.status === 400) {
                    await this.$router.push('/login')
                }
                const a = await resp.json()
                console.log(a)
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
</script>

<style scoped>

</style>
