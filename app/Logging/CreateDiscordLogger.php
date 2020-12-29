<?php

namespace App\Logging;

use DiscordHandler\DiscordHandler;
use Monolog\Formatter\LineFormatter;
use Monolog\Logger;

class CreateDiscordLogger
{
    /**
     * Create a custom Monolog instance.
     *
     * @param  array  $config
     * @return \Monolog\Logger
     */
    public function __invoke(array $config)
    {
        $log = new Logger('discord');

        $handler = new DiscordHandler($config['url'], '', '', $config['level']);

        $handler->getConfig()
            ->setMultiMsg(true)
            ->setMaxMessageLength(2000)
            ->setDatetimeFormat('Y/m/d H:i')
            ->setTemplate('**[{datetime}]**: {message}');

        $log->pushHandler($handler);

        return $log;
    }
}
