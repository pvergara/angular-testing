import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator/jest';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let spectatorPipe: SpectatorPipe<ReversePipe>;
  const createPipe = createPipeFactory(ReversePipe);

  it('should reverse a String', () => {
    spectatorPipe = createPipe('{{ "Hello" | reverse}}');
    expect(spectatorPipe.element).toHaveText('olleH');
  });

  it('How to handle empty string', () => {
    spectatorPipe = createPipe('{{ "" | reverse}}');
    expect(spectatorPipe.element).toHaveText('');
  });

  it('Reverse numbers as strings', () => {
    spectatorPipe = createPipe('{{ "12345" | reverse}}');
    expect(spectatorPipe.element).toHaveText('54321');
  });

  it('Reverse order with more than one word', () => {
    spectatorPipe = createPipe('{{ "Hell.o world!" | reverse}}');
    expect(spectatorPipe.element).toHaveText('!dlrow o.lleH');
  });
});
