import React from "react";
import ReactDOM from "react-dom";
import './index.css'

import ReactJson from 'react-json-view';

const ReactJsonView = ReactJson.default || ReactJson;

// the render function is for the anywidget
function render(view) {
    const root = ReactDOM.createRoot(view.el);

    // Get the model from the view to access traits
    const model = view.model;
    // Create the component with data and options
    const App = () => {
        return (
			<>
			  <ReactJsonView
					src={model.get('json_data')}
					theme={model.get('theme') || 'rjv-default'}
					name={null}
					displayDataTypes={false}
				/>
			</>
        );
    };

    root.render(<App />);
    return () => root.unmount();
}

export default { render };
