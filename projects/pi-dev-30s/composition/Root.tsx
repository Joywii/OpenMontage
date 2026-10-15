import React from 'react';
import {Composition} from 'remotion';
import {PiBuildFilm} from './Composition';
export const Root: React.FC = () => <Composition id="PiBuild30" component={PiBuildFilm} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{captions:[], audio:[]}} />;
