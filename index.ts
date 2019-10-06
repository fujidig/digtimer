function main() {
    const formcontainer = document.getElementById("form-container");
    const resultcontainer = document.getElementById("result-container");
    const form = <HTMLFormElement>document.getElementById("form");
    const timeinput = <HTMLInputElement>document.getElementById("timeinput");
    const timeelem = document.getElementById("time");
    const startelem = document.getElementById("start");
    const endelem = document.getElementById("end");
    const elapsedtimeelem = document.getElementById("elapsedtime");
    const remaininigtimeelem = document.getElementById("remainingtime");
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const size = canvas.width = canvas.height = Math.min(document.body.clientWidth, 400);
    const ctx = canvas.getContext("2d");
    let time = 0;
    let starttime = 0;
    form.addEventListener("submit", () => {
        time = Number(timeinput.value) * 60;
        const date = new Date();
        starttime = +date;
        formcontainer.style.display = "none";
        resultcontainer.style.display = "";
        timeelem.textContent = Math.floor(time / 60) + " min ";
        startelem.textContent = formatTime(date);
        endelem.textContent = formatTime(new Date(+date + time * 1000));
        setInterval(update);
    });

    function update() {
        const now = Date.now();
        const elapsed = Math.min((now - starttime) / 1000, time);
        const reamaining = time - elapsed;
        elapsedtimeelem.textContent = Math.floor(elapsed / 60) + " min " + Math.floor(elapsed % 60) + " sec";
        remaininigtimeelem.textContent = Math.floor(reamaining / 60) + " min " + Math.floor(reamaining % 60) + " sec";
        draw(ctx, size, time, elapsed);
    }
}

function draw(ctx: CanvasRenderingContext2D, size: number, time: number, elapsed: number) {
    const ratio = 1 - elapsed / time;
    const outerradius = size * 0.4;
    const innerradius = size * 0.3;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.fillStyle = "#ccc";
    drawarc(2 * Math.PI - Math.PI / 2);
    ctx.fillStyle = "#349eeb";
    drawarc(- Math.PI / 2 + Math.PI * 2 * ratio);
    
    function drawarc(theta: number) {
        ctx.beginPath();
        ctx.arc(0, 0, outerradius, - Math.PI / 2, theta);
        ctx.lineTo(outerradius * Math.cos(theta), outerradius * Math.sin(theta));
        ctx.lineTo(innerradius * Math.cos(theta), innerradius * Math.sin(theta));
        ctx.arc(0, 0, innerradius, theta, - Math.PI / 2, true);
        ctx.fill();
    }
    ctx.restore();


}

function formatTime(date: Date): string {
    return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
}

window.addEventListener("load", main);