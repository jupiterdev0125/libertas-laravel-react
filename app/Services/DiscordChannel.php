<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Command\Exception\CommandException;
use RestCord\DiscordClient;
use RuntimeException;

class DiscordChannel
{
    /** @var int */
    private $channelId;

    /** @var DiscordClient */
    private $client;

    public function __construct(int $channelId)
    {
        $this->channelId = $channelId;
        $this->client = new DiscordClient(['token' => config('services.discord.bot_key')]);
    }

    public function send($data)
    {
        try {
            $this->client->channel->createMessage([
                'channel.id' => $this->channelId,
                'content' => $data->plain_text,
                'embed' => $data->toArray(),
            ]);
        } catch (Exception $exception) {
            if ($exception instanceof CommandException) {
                throw new RuntimeException(
                    sprintf(
                        'Sending a message failed. Response code = %s, Response = %s. Trying to send message to "%s"',
                        $exception->getResponse()->getStatusCode(),
                        $exception->getResponse()->getBody(),
                        $exception->getRequest()->getUri()
                    )
                );
            }

            throw new RuntimeException('Sending a message failed because: '.$exception->getMessage());
        }
    }
}
