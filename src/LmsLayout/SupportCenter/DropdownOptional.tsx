import React from 'react'

function DropdownOptional(props: {options: string[]; defaultValue: string; show: boolean}) {
  const myOptions = props.options
  const defaultValue = props.defaultValue
  const show = props.show
  return (
    <div>
      <select
        className=' form-select form-control '
        data-kt-select2='true'
        data-placeholder='Select option'
        data-allow-clear='true'
        defaultValue={defaultValue}
        disabled={show}
      >
        {myOptions.map((item: any, index: any) => {
          return (
            <>
              <option value={item}>{item}</option>
            </>
          )
        })}
      </select>
    </div>
  )
}

export default DropdownOptional
