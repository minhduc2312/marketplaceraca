import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring'
import { useState } from 'react'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [show, setShow] = useState(true)
    const transition = useTransition(true, {
        from: { x: -500, y: 10, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1, display: 'block' },
        leave: { x: 500, y: 10, opacity: 0, display: 'none' }
    })
    return (

        <div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            style={{ color: '#ffffff' }}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {(

                transition((style, item) =>
                (<animated.div style={style}>
                    <Typography component={'span'}>{children}</Typography>
                </animated.div>)
                )
                /*{ <Box sx={{ span: 3 }}>
                    {transition((style, item) =>
                        (<animated.div style={style}>
                            <Typography component={'span'}>{children}</Typography>
                        </animated.div>)
                    )}

                </Box> }*/
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel;