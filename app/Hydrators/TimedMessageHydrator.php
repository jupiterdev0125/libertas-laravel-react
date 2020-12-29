<?php

declare(strict_types=1);

namespace App\Hydrators;

use App\Models\TimedMessage;
use Illuminate\Http\Request;
use InvalidArgumentException;

final class TimedMessageHydrator
{
    public function hydrateFromRequest(Request $request): TimedMessage
    {
        $timedMessage = $this->getTimedMessage($request->input('id', null));

        $this->addChannelToTimedMessage($request, $timedMessage);
        $this->addIntervalToTimedMessage($request, $timedMessage);
        $this->addNextOccurrenceToTimedMessage($timedMessage);
        $this->addNameToTimedMessage($request, $timedMessage);

        return $timedMessage;
    }

    private function getTimedMessage(?string $timedMessageId): TimedMessage
    {
        if (null !== $timedMessageId && $timedMessageId > 0) {
            return TimedMessage::find($timedMessageId);
        }

        return new TimedMessage();
    }

    private function addChannelToTimedMessage(Request $request, TimedMessage $timedMessage): void
    {
        $channels = $request->input('channel_id', []);
        if (count($channels) === 0) {
            throw new InvalidArgumentException('channel_id cannot be empty');
        }
        $timedMessage->channel_id = $channels[0];
    }

    private function addIntervalToTimedMessage(Request $request, TimedMessage $timedMessage): void
    {
        $intervals = $request->input('interval', []);
        if (count($intervals) === 0) {
            throw new InvalidArgumentException('interval cannot be empty');
        }

        if ($intervals[0] <= 0) {
            throw new InvalidArgumentException('interval cannot be equal to or lower than 0');
        }

        $timedMessage->interval = $intervals[0];
    }

    private function addNextOccurrenceToTimedMessage(TimedMessage $timedMessage): void
    {
        $timedMessage->next_occurrence = now()->addSeconds($timedMessage->interval);
    }

    private function addNameToTimedMessage(Request $request, TimedMessage $timedMessage): void
    {
        $messageName = $request->input('name', '');
        if ($messageName === '') {
            throw new InvalidArgumentException('timed message name cannot be empty');
        }
        $timedMessage->name = $messageName;
    }
}
