const { ipcRenderer } = window.require("electron")
import React from "react"
import { render } from "react-dom"
import { GrSubtract, GrCheckbox, GrClose } from "react-icons/gr"
import "./style.scss"

function Main() {
	return (
		<>
			<div id="titlebar">
				<div id="dragZone">Hello, electron!</div>
				<div id="windowControl">
					<button onClick={() => ipcRenderer.invoke('minimize')}><GrSubtract /></button>
					<button onClick={() => ipcRenderer.invoke('maximize')}><GrCheckbox /></button>
					<button onClick={() => ipcRenderer.invoke('close')}><GrClose /></button>
				</div>
			</div>
			<h1>hello, world!!</h1>
		</>
	)
}

render(<Main />, document.getElementById("App"))