const figure = new Fig.Figure({
  backgroundColor: [0, 0, 0, 1], color: [1, 1, 1, 1], scene: [-2 * 1.2, -1 * 1.2, 2 * 1.2, 1 * 1.2]
});

const axis = figure.add({
  make: 'collections.axis',
  length: 2,
  start: 0,
  stop: 2,
  position: [-1, 0],
  ticks: [
    { step: 1, length: 0.05, offset: 0 },
  ],
  labels: { precision: 0 },

  font: { size: 0.07 },
});

const toggle = figure.add({
  make: 'collections.toggle',
  label: {
    text: 'Manual',
    location: 'bottom',
  },
  theme: 'light',
  position: [1.9, 1],
});


const button = figure.add({
  make: 'collections.button',
  width: 0.35,
  height: 0.3,
  corner: { radius: 0.05, sides: 20 },
  label: 'Go',
  touchBorder: 0.2,
  position: [1.9, -0.9],
  touchDown: { colorFill: [0.3, 0.3, 0.3, 1] },
});


const colorY = [1, 1, 0, 1];
const colDim = [1, 1, 0, 1];

const [eqn, slider, soln] = figure.add([
  {
    make: 'equation',
    elements: {
      numerator: '2',
      denominator: '3',
      div: '  \u00f7  ',
      v: { symbol: 'vinculum', width: 0.005 },
      equals: '  =  ',
    },
    scenarios: {
      center: { position: [-0.5, 0], scale: 1.8 },
      left: { position: [-2, -0.9], scale: 1 },
      final: { position: [-0.8, -0.35], scale: 1 },
      top: { position: [-0.3, 0.8], scale: 1 },
      centerLeft: { position: [-2.2, 0.8], scale: 1.5 },
    },
    forms: {
      0: ['_1', 'div', { frac: ['numerator', 'v', 'denominator'] }],
      1: ['_1', 'div', { frac: ['numerator', 'v', 'denominator'] }, 'equals'],
    },
    formDefaults: { alignment: { xAlign: 'left', yAlign: 'baseline' } },
  },
  {
    make: 'collections.slider',
    width: 2,
    position: [0, -0.9],
    theme: 'light',
    barHeight: 0.01,
    height: 0.1,
    marker: 'rectangle',
    touchBorder: 0.2,
  },
  {
    make: 'equation',
    elements: {
      whole: '1',
      numerator: '2',
      denominator: '3',
      fNum: { text: '1' },
      fDen: { text: '2' },
      v: { symbol: 'vinculum', width: 0.005 },
      v1: { symbol: 'vinculum', width: 0.005 },
      equals: '  =    ',
      equals2: '  =    ',
      brace: { symbol : 'brace', side: 'bottom', lineWidth: 0.01, color: [0.6, 0.6, 0.6, 1] },
      lots: { text: '  portions', color: colDim },
    },
    scenarios: {
      center: { position: [-1, 0.1], scale: 1 },
      final: { position: [-0.3, -0.35], scale: 1 },
    },
    phrases: {
      w: 'whole',
      wf: ['whole', '  ', { frac: ['numerator', 'v', 'denominator'] }],
      f: { frac: ['numerator', 'v', 'denominator'] },
      wPortions: ['w', 'lots'],
      wfPortions: ['wf', 'lots'],
      finalFrac: { frac: ['fNum', 'v1', 'fDen'] },
      fPortions: ['f', 'lots'],
    },
    forms: {
      w1: { content: [{ bottomComment: { content: { container: { width: 1, content: '' } }, comment: 'wPortions', scale: 1, symbol: 'brace' } }], alignment: { yAlign: 'top' } },
      wf1: { bottomComment: { content: { container: { width: 1, content: '' }, alignment: { yAlign: 'top' }  }, comment: 'wfPortions', scale: 1, symbol: 'brace' } },
      f1: { bottomComment: { content: { container: { width: 1, content: '' }, alignment: { yAlign: 'top' }  }, comment: 'fPortions', scale: 1, symbol: 'brace' } },
      w2: { content: ['equals', 'w'], alignment: { xAlign: 'left' } },
      wf2: { content: ['equals', 'wf'], alignment: { xAlign: 'left' } },
      f2: { content: ['equals', 'f'], alignment: { xAlign: 'left' } },
      w3: { content: ['equals', 'w', 'equals2', 'finalFrac'], alignment: { xAlign: 'left' } },
      wf3: { content: ['equals', 'wf', 'equals2', 'finalFrac'], alignment: { xAlign: 'left' } },
      f3: { content: ['equals', 'f'], alignment: { xAlign: 'left' } },
      f3Final: { content: ['equals', 'f'], alignment: { xAlign: 'left' } },
      final: { content: ['equals', 'finalFrac'], alignment: { xAlign: 'left' } },
    },
    formDefaults: { alignment: { xAlign: 'left', yAlign: 'baseline' } },
  },
]);

const maxBars = 10;

const fractions = [
  [2, 9], [4, 9], [5, 9], [7, 9], [8, 9],
  [3, 8], [5, 8], [7, 8],
  [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
  [5, 6],
  [1, 5], [2, 5], [3, 5], [4, 5],
  [1, 4], [3, 4],
  [1, 3], [2, 3],
  [1, 2],
  [3, 2],
  [4, 3],
  [5, 4], [5, 3],
  [6, 5],
  [7, 6], [7, 5], [7, 4],
  [8, 7], [8, 5],
  [9, 8], [9, 7], [9, 5],
].map(f => [f[0] / f[1], f[0], f[1]]).sort();

const makeRect = (name, width, color, fill, position) => {
  return figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, 0, 0, 0],
        xStep: 0.1,
        yStep: 1,
        line: {
          dash: [0.03, 0.34],
          width: 0.003,
        },
        mods: {
          isShown: false,
        },
      },
      {
        name: 'bar',
        make: 'rectangle',
        width,
        height: 0.4,
        color,
      },
      {
        name: 'barLine',
        make: 'rectangle',
        width,
        height: 0.4,
        color: [0.8, 0.8, 0.8, 1],
        line: { width: 0.005 }
      },
      {
        name: 'eqn',
        make: 'equation',
        elements: {
          numerator: '2',
          denominator: '3',
          v: { symbol: 'vinculum', width: 0.005 },
        },
        forms: { 0: { frac: ['numerator', 'v', 'denominator'] }, 1: '_1' },
        color: [1, 1, 1, 1],
        scale: 0.6,
        formDefaults: {
          alignment: { xAlign: 'center', yAlign: 'middle' },
        },
      },
    ],
    move: name === 'bar' ? false : true,
    position,
    scenarios: {
      lower: { position: [0, 0] },
      upper: { position: [0, 0] },
    }
  });
};

const bar = makeRect('bar', 1, [1, 0, 0, 1], true, [-0.5, 0.35]);
bar._eqn.showForm('1');


const bars = [];
for (let i = 0; i < maxBars; i += 1) {
  bars.push(makeRect(`f${i}`, 1, [0, 0.5, 1, 0.5], true, [0, -0.35]));
}

const hideBars = () => {
  for (let i = 0; i < bars.length; i += 1) {
    bars[i].hide();
  }
  bar.hide();
  axis.hide();
}

const getFraction = () => {
  const index = Math.floor(slider.getValue() / (1 / (fractions.length - 1)));
  const fraction = fractions[index];
  return fraction;
}

const setBars = (hideGrid = false) => {
  for (let i = 0; i < bars.length; i += 1) {
    const fraction = getFraction();
    bars[i].show();
    bars[i].scenarios.lower.position = [-1 + fraction[0] / 2 + i * fraction[0], -0.35];
    bars[i].scenarios.upper.position = [-1 + fraction[0] / 2 + i * fraction[0], 0.35];
    bars[i].setScenario('lower');
    bars[i]._bar.custom.updatePoints({ width: fraction[0] });
    bars[i]._barLine.custom.updatePoints({ width: fraction[0] });
    bars[i]._eqn.updateElementText({ numerator: `${fraction[1]}`, denominator: `${fraction[2]}` }, 'all');
    bars[i]._grid.custom.updatePoints({
      bounds: [-fraction[0] / 2, -0.2, fraction[0], 0.4],
      xStep: fraction[0] / fraction[1],
    })
    if (hideGrid) {
      bars[i]._grid.hide();
    } else {
      bars[i]._grid.show();
    }
    if (i > Math.floor(1 / fraction[0] - 0.00001)) {
      bars[i].hide();
    }
  }
};

const showManual = () => {
  figure.stop();
  setBars(false);
  soln.hide();
  bar.show();
  bar._eqn.hide();
  axis.show();
  eqn.showForm('0');
  eqn.setScenario('centerLeft');
  button.hide();
}

const showAuto = () => {
  figure.stop();
  setBars();
  axis.hide();
  bar.hide();
  hideBars();
  soln.hide();
  eqn.showForm('0');
  eqn.setScenario('center');
  button.show();
}

slider.notifications.add('changed', (value) => {
  const index = Math.floor(value / (1 / (fractions.length - 1)));
  const fraction = fractions[index];
  eqn.updateElementText({
    numerator: `${fraction[1]}`,
    denominator: `${fraction[2]}`,
  }, 'all');
  if (toggle._custom.state) {
    showManual();
  } else {
    showAuto();
  }
});
slider.setValue(0.48);

toggle.notifications.add('on', () => showManual());
toggle.notifications.add('off', () => showAuto());

const setSoln = () => {
  const fraction = getFraction();
  const whole = Math.floor(1 / (fraction[1] / fraction[2]));
  const f = Fig.round(1 / fraction[0], 1) % 1;
  soln.updateElementText(
    {
      whole: `${whole}`,
      numerator: `${fraction[2] % fraction[1]}`,
      denominator: `${fraction[1]}`,
      fNum: `${fraction[2]}`,
      fDen: `${fraction[1]}`,
    },
    'all',
  );
  if (whole > 0 && f !== 0) {
    soln.showForm('wf1');
  } else if (whole > 0 && f == 0) {
    soln.showForm('w1');
  } else {
    soln.showForm('f1');
  }
}

button.notifications.add('onClick', () => {
  figure.stop();
  const fraction = getFraction();
  setBars();
  hideBars();
  soln.hide();
  soln.setScenario('center');
  eqn.setScenario('center');
  eqn.showForm('0');
  const barsToShow = [];
  for (let i = 0; i <= bars.length; i += 1) {
    if (i <= Math.floor(1 / fraction[0] - 0.00001)) {
      barsToShow.push(bars[i])
    }
  }
  figure.animations.new()
    .then(eqn.animations.scenario({ target: 'left', duration: 2 }))
    // .then(eqn.animations.goToForm({ target: '1', animate: 'move', duration: 2 }))
    .dissolveIn({ element: axis, duration: 1 })
    .delay(0.5)
    .dissolveIn({ element: bar, duration: 1 })
    .delay(0.5)
    // .dissolveIn({ elements: barsToShow })
    .trigger(() => {
      bar._eqn.showForm('1');
      bar._eqn.animations.new()
        .delay(1)
        .dissolveOut(1)
        .start();
    })
    .delay(0.5)
    .trigger({
      callback: () => {
        for (let i = 0; i < barsToShow.length; i += 1) {
          barsToShow[i].setScenario('lower');
          barsToShow[i].show();
          barsToShow[i].setOpacity(0);
          barsToShow[i].animations.new()
            .delay(3 * i)
            .opacity({ target: 1, duration: 1 })
            .scenario({ target: 'upper', duration: 1.5 })
            .start();
        }
      },
      duration: barsToShow.length * 3,
    })
    .dissolveOut({ element: axis })
    .trigger({
      callback: () => {
        if (fraction[2] % fraction[1] !== 0) {
          barsToShow[barsToShow.length - 1].animations.new()
            .dissolveIn({ element: 'grid', duration: 1 })
            .start();
        }
      },
      duration: 0,
    })
    .trigger({
      callback: () => {
        setSoln();
        soln.animations.new()
          .dissolveIn(1)
          .start();
      },
      duration: 1,
    })
    .delay(2)
    .trigger({
      callback: () => {
        const whole = Math.floor(1 / (fraction[1] / fraction[2]));
        const f = Fig.round(1 / fraction[0], 1) % 1;
        let target = 'f2';
        let target2 = 'f3';
        let target3 = 'f3Final';
        if (whole > 0 && f !== 0) {
          target = 'wf2';
          target2 = 'wf3'
          target3 = 'final';
        } else if (whole > 0 && f == 0) {
          target = 'w2';
          target2 = 'w3'
          target3 = 'final';
        }
        figure.animations.new()
          .inParallel([
            soln.animations.goToForm({ target, animate: 'move', duration: 3 }),
            soln.animations.scenario({ target: 'final', duration: 3 }),
            eqn.animations.scenario({ target: 'final', duration: 3 }),
          ])
          .delay(1)
          .then(soln.animations.goToForm({ target: target2, animate: 'move', duration: 3 }))
          .delay(1)
          .then(soln.animations.goToForm({ target: target3, animate: 'move', duration: 3 }))
          .start();
      },
    })
    .start();
});




figure.setScenarios('start');
