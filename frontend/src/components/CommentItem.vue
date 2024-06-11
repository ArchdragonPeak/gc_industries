<template>
    <div class="commentitem">
        <div class="head">
            <div class="profile">
                <div class="profile-item">
                    <img alt="Pic" src="../../public/img/gigachad_logo.png"  height="32" width="32">
                </div>
                <div class="profile-item">
                    <p><b>LinusTechTips</b></p>
                </div>
                <div class="profile-item" id="date">
                    <p> 11.06.2024 </p>
                </div>
            </div>
            
        </div>

        <div class="body">
            <div class="text-wrapper">
                <p class="text"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'CommentItem',
        props: {
                profilepic: String,
                username: String,
                date: String
        }
    }
</script>

<style scoped>
#date {
    color: gray;
    padding-left: 1%;
}
img {
    border-radius: 50%;
}
.profile {
    padding: 0;
    margin-left: 12px;
}
.commentitem {
    background-color: lightgray;
    border-radius: 12px;
}
.head {
    align-content: center;
    height: 20%;
}
.body {
    height: 80%;
}
.profile-item {
    display: inline-block;
    vertical-align: middle;
    margin: 2px 2px 0px 2px;
}
.text-wrapper {
    margin: 0px 12px 12px 12px;
    font-size: 16px;
    font-family: monospace;
}
.text {
    padding-bottom: 12px;
    margin-top: 0px;
}
</style>