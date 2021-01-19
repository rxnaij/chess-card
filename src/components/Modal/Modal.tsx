import React from 'react'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import { HTMLInputValue } from '../RadioButtonGroup/RadioButton'
import { CardColorState } from '../types'
import IGStory from '../Canvas/IGStory'
import Konva from 'konva'
import { Stage } from 'react-konva'

type ModalProps = {
    exit: () => void,
    action: Array<() => void>,
    canvas: JSX.Element
}

const Modal = ({exit, action, canvas}: ModalProps) => {
    const [bg, setBg] = React.useState<CardColorState>('')
    const storyRef = React.useRef<Konva.Stage>(null!)
    const backgroundColorValues = [
        {
            key: 'green',
            value: '#62C370'
        },
        {
            key: 'red',
            value: '#FF666B'
        }
    ]
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div onClick={() => exit()} className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Create Instagram story
                                </h3>
                                <div className="mt-2 grid grid-cols-2">
                                    <div>
                                        <RadioButtonGroup<CardColorState>
                                            label="Pick a background."
                                            name="backgroundColor"
                                            values={backgroundColorValues}
                                            onChange={(v: HTMLInputValue) => setBg(backgroundColorValues.find(c => c.key === v)!.value)}
                                            customRadioButton={(isActive, value) => ({
                                                style: {
                                                    display: 'inline-block',
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'gray',
                                                    marginRight: '1.5rem',
                                                    color: 'black'
                                                },
                                                className: "bg-green-100 hover:bg-green-400 cursor-pointer"
                                            })}
                                        />
                                        <p className="text-sm text-gray-500">Pick a screen size</p>
                                    </div>
                                    <div>
                                        <Stage ref={storyRef} width={375} height={667}>
                                            <IGStory width={375} height={667} color='#212121' />
                                            {/* { canvas } */}
                                        </Stage>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={() => action[0]()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Download
                        </button>
                        <button type="button" onClick={() => exit()} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
